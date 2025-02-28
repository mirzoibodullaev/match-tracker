import { memo } from "react";
import { Team } from "@/types";
import Avatar from "@/assets/icons/avatar.svg";
import cls from "./MatchDetails.module.scss";

interface MatchDetailsProps {
    homeTeam: Team;
    awayTeam: Team;
}

export const MatchDetails = memo(({ homeTeam, awayTeam }: MatchDetailsProps) => {
    return (
        <div className={cls.selected}>
            <div className={cls.players}>
                <div className={cls.player}>
                    {homeTeam.players.map((player) => (
                        <div key={player.username} className={cls.userInfo}>
                            <img
                                className={cls.avatar}
                                src={Avatar}
                                alt="avatar"
                            />
                            <span className={cls.username}>
                                {player.username}
                            </span>
                            <span className={cls.kills}>
                                Убийств:
                                <span className={cls.number}>
                                    {player.kills}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={cls.matchInfo}>
                    <span className={cls.points}>
                        Points:
                        <span className={cls.number}>+{homeTeam.points}</span>
                    </span>
                    <span className={cls.place}>
                        Место:
                        <span className={cls.number}>{homeTeam.place}</span>
                    </span>
                    <span className={cls.kills}>
                        Всего убийств:{" "}
                        <span className={cls.number}>
                            {homeTeam.total_kills}
                        </span>
                    </span>
                </div>
            </div>
            <div className={cls.players}>
                <div className={cls.player}>
                    {awayTeam.players.map((player) => (
                        <div key={player.username} className={cls.userInfo}>
                            <img
                                className={cls.avatar}
                                src={Avatar}
                                alt="avatar"
                            />
                            <span className={cls.username}>
                                {player.username}
                            </span>
                            <span className={cls.kills}>
                                Убийств:{" "}
                                <span className={cls.number}>
                                    {player.kills}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={cls.matchInfo}>
                    <span className={cls.points}>
                        Points:
                        <span className={cls.number}>+{awayTeam.points}</span>
                    </span>
                    <span className={cls.place}>
                        Место:
                        <span className={cls.number}>{awayTeam.place}</span>
                    </span>
                    <span className={cls.kills}>
                        Всего убийств:
                        <span className={cls.number}>
                            {awayTeam.total_kills}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
});
