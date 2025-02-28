import axios from "axios";
import { useEffect, useState, useCallback, memo } from "react";
import cls from "./MatchList.module.scss";
import { Match } from "src/types";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";
import { Card } from "@/components/Card";
import ErrorAlert from "@/assets/icons/alert-triangle.svg"


const API_URL = "https://app.ftoyd.com/fronttemp-service/fronttemp";
const WS_URL = "wss://app.ftoyd.com/fronttemp-service/ws";

export const MatchList = memo(() => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(
        null
    );
    const [filter, setFilter] = useState<string | null>(null);

    const transformMatches = (matches: Match[]): Match[] => {
        return matches.map((match) => ({
            ...match,
            status:
                match.status === "Finished"
                    ? "Finished"
                    : match.status === "Ongoing"
                    ? "Live"
                    : "Match preparing",
        }));
    };

    const fetchMatches = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ data: { matches: Match[] } }>(
                API_URL
            );
            setMatches(transformMatches(response.data.data.matches));
        } catch (err) {
            setError("Ошибка: не удалось загрузить информацию");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    const filteredMatches = filter
        ? matches.filter((match) => match.status === filter)
        : matches;

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log("WebSocket подключен");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.data) {
                    setMatches(transformMatches(data.data));
                }
            } catch (error) {
                console.error("Ошибка обработки сообщения WebSocket", error);
            }
        };

        ws.onerror = (error) => {
            console.error("Ошибка WebSocket", error);
        };

        ws.onclose = () => {
            console.log("WebSocket закрыт");
        };

        return () => {
            ws.close();
        };
    }, []);

    const onSelectMatch = (index: number) => {
        setSelectedMatchIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div>
            <header className={cls.header}>
                <div className={cls.matchFilter}>
                    <h1 className={cls.matchTitle}>Match Tracker</h1>
                    <Select filter={filter} setFilter={setFilter} />
                </div>
                <div className={cls.matchHeader}>
                    {error && (
                        <div className={cls.error}>
                            <img src={ErrorAlert} alt="Error..." />
                            <p className={cls.errorText}>{error}</p>
                        </div>
                    )}
                    <Button
                        disabled={isLoading}
                        onClick={fetchMatches}
                        isLoading={isLoading}
                    >
                        Обновить
                    </Button>
                </div>
            </header>
            {isLoading ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : (
                <div className={cls.matches}>
                    {filteredMatches.map((match, index) => (
                        <Card
                            key={index}
                            isSelected={selectedMatchIndex === index}
                            onClick={() => onSelectMatch(index)}
                            {...match}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});
