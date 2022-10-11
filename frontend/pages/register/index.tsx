import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { object, ref, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "@components/Layout";
import Input from "@components/Input";
import ErrorMessage from "@components/ErrorMessage";
import { UserRegister } from "@tstypes/AccountFields";
import { useAuth } from "@context/AuthContext";

const schema: SchemaOf<UserRegister> = object({
    username: string().defined().required("Please provide a username."),
    email: string().email("Please provide a valid email.").required("Please provide a email."),
    password: string()
        .required("Please provide a password.")
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/, "Must contain 8 characters with character and number."),
    confirm_password: string()
        .required("Please retype your password.")
        .oneOf([ref("password")], "Your password not match."),
});

export default function RegisterPage() {
    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit,
        setFocus,
    } = useForm<UserRegister>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        reValidateMode: "onSubmit",
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const router = useRouter();
    const { createUser } = useAuth();

    useEffect(() => setFocus("username"), [setFocus]);

    const onSubmit: SubmitHandler<UserRegister> = async ({ username, email, password }) => {
        try {
            await createUser({ username, email, password });
            router.push("/dashboard");
        } catch (error) {
            toast("Failed to register.", {
                toastId: "toast-info",
            });
        }
    };

    return (
        <Layout title="DJ Events | Register">
            <div className="m-auto px-8 py-2">
                <h1 className="text-6xl font-lato font-bold after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <Input<UserRegister> type="text" name="username" placeholder="Username" register={register} />
                        <ErrorMessage error={errors.username} message={errors.username?.message} />
                    </div>
                    <div className="mb-6">
                        <Input<UserRegister> type="email" name="email" placeholder="Email" register={register} />
                        <ErrorMessage error={errors.email} message={errors.email?.message} />
                    </div>
                    <div className="mb-6">
                        <Input<UserRegister> type="password" name="password" placeholder="Password" register={register} />
                        <ErrorMessage error={errors.password} message={errors.password?.message} />
                    </div>
                    <div className="mb-6">
                        <Input<UserRegister> type="password" name="confirm_password" placeholder="Confirm Password" register={register} />
                        <ErrorMessage error={errors.confirm_password} message={errors.confirm_password?.message} />
                    </div>
                    <button
                        className="w-full text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white disabled:text-gray-500 disabled:bg-gray-100"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Register
                    </button>
                </form>
                <h1 className="text-[8em] font-lato text-right text-orange-600 leading-snug">** Music is what feelings sound like.</h1>
            </div>
        </Layout>
    );
}
