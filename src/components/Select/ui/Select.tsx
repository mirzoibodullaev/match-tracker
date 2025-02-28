import { memo, useState } from "react";
import cls from "./Select.module.scss";
import Arrow from "@/assets/icons/selectArrow.svg";

interface SelectProps {
    filter: string | null;
    setFilter: (value: string | null) => void;
}

export const Select = memo(({ filter, setFilter }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const statuses = ["Все статусы", "Live", "Finished", "Match preparing"];

    return (
        <div className={cls.selectWrapper}>
            <select
                className={cls.Select}
                value={filter || "Все статусы"}
                onChange={(e) =>
                    setFilter(
                        e.target.value === "Все статусы" ? null : e.target.value
                    )
                }
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
            >
                {statuses.map((status) => (
                    <option className={cls.option} key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <img
                className={`${cls.arrowIcon} ${isOpen ? cls.open : ""}`}
                src={Arrow}
                alt="Arrow"
            />
        </div>
    );
});
