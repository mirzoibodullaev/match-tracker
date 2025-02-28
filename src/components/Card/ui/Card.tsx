import { memo } from "react";
import CountUp from "react-countup";
import { MatchDetails } from "@/components/MatchDetails";
import { Team } from "@/types";
import Arrow from "@/assets/icons/arrow.svg";
import CommandIcon from "@/assets/icons/commandIcon.svg";
import cls from "./Card.module.scss";

interface CardProps {
    isSelected?: boolean;
    time: string;
    title: string;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number;
    awayScore: number;
    status: string;
    onClick: () => void;
}

export const Card = memo(
    ({
        isSelected,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        status,
        onClick,
    }: CardProps) => {
        const getStatusColor = (status: string) => {
            switch (status) {
                case "Live":
                    return "#43AD28";
                case "Finished":
                    return "#EB0237";
                case "Match preparing":
                    return "#EB6402";
                default:
                    return "#000";
            }
        };

        return (
            <div className={cls.Card}>
                <div className={cls.cardHeader} onClick={onClick}>
                    <div className={cls.command}>
                        <img
                            className={cls.commandIcon}
                            src={CommandIcon}
                            alt="Command 2"
                        />
                        {awayTeam.name}
                    </div>
                    <div className={cls.score}>
                        <div className={cls.scoreInfo}>
                            <span>
                                <CountUp end={awayScore} duration={1} />
                            </span>
                            <span>:</span>
                            <span>
                                <CountUp end={homeScore} duration={1} />
                            </span>
                        </div>
                        <div
                            className={cls.status}
                            style={{ backgroundColor: getStatusColor(status) }}
                        >
                            {status}
                        </div>
                    </div>

                    <div className={cls.command}>
                        {homeTeam.name}
                        <img
                            className={cls.commandIcon}
                            src={CommandIcon}
                            alt="Command 1"
                        />
                        <img
                            className={isSelected ? cls.active : cls.arrow}
                            src={Arrow}
                            alt=">"
                        />
                    </div>
                </div>
                <div
                    className={`${cls.matchDetailsWrapper} ${
                        isSelected ? cls.matchDetailsOpen : ""
                    }`}
                >
                    {isSelected && (
                        <MatchDetails homeTeam={homeTeam} awayTeam={awayTeam} />
                    )}
                </div>
            </div>
        );
    }
);
