import { GetServerSideProps } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "@components/Layout";
import Input from "@components/Input";
import ErrorMessage from "@components/ErrorMessage";
import { UserLogin } from "@tstypes/AccountFields";
import { useAuth } from "@context/AuthContext";
import { parseCookie } from "@utils/helper";

type Props = {};

const schema: SchemaOf<UserLogin> = object({
    email: string().email("Please provide a valid email.").required("Please provide a email."),
    password: string()
        .required("Please provide a password.")
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/, "Must contain 8 characters with character and number."),
});

export default function LoginPage({}: Props) {
    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit,
        setFocus,
    } = useForm<UserLogin>({
        defaultValues: {
            email: "",
            password: "",
        },
        reValidateMode: "onSubmit",
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => setFocus("email"), [setFocus]);

    const onSubmit: SubmitHandler<UserLogin> = async ({ email, password }) => {
        try {
            await login({ email, password });
            router.push("/dashboard");
        } catch (error) {
            toast("Failed to login.", {
                toastId: "toast-info",
            });
        }
    };

    return (
        <Layout title="DJ Events | Login">
            <div className="m-auto px-8 py-2">
                <h1 className="text-6xl font-lato font-bold after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <Input<UserLogin> type="email" name="email" placeholder="Email" register={register} />
                        <ErrorMessage error={errors.email} message={errors.email?.message} />
                    </div>
                    <div className="mb-6">
                        <Input<UserLogin> type="password" name="password" placeholder="Password" register={register} />
                        <ErrorMessage error={errors.password} message={errors.password?.message} />
                    </div>
                    <button
                        className="w-full text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white disabled:text-gray-500 disabled:bg-gray-100"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Login
                    </button>
                </form>
                <h1 className="text-[8em] font-lato text-orange-600 leading-snug">Without music life would be a mistake.. @^^@</h1>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = parseCookie(context.req);
    console.log(token);

    if (token)
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard",
            },
        };

    return {
        props: {},
    };
};
