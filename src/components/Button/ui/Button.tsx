import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./Button.module.scss";
import LoadingIcon from "@/assets/icons/Refresh.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children?: ReactNode;
}

export const Button = ({ children, isLoading, ...props }: ButtonProps) => {
    return (
        <button
            className={cls.Button}
            {...props}
            disabled={isLoading || props.disabled}
        >
            {children}
            <img
                src={LoadingIcon}
                alt="loading..."
                className={`${cls.loadingIcon} ${isLoading ? cls.loading : ""}`}
            />
        </button>
    );
};
