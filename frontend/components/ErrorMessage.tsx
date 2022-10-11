import { FieldError } from "react-hook-form";

type Props = {
    error?: FieldError;
    message: string;
};

export default function ErrorMessage({ error, message }: Props) {
    if (!error) return null;
    return <p className="mt-2 text-pink-600 text-sm">{message}</p>;
}

ErrorMessage.defaultProps = {
    message: "Look like you have invalid field",
};
