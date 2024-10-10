const FormMessage = ({ children }: any) => {
    return (
        <p
            className="text-red-500 text-xs font-medium mb-2"
        >
            {children}
        </p>
    );
}

export default FormMessage;