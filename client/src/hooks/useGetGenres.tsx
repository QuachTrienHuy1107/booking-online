import React from "react";
import movieApi from "service/movie.service";
import { useAppDispatch } from "store/store";

export const useGetGenres = () => {
    const [genres, setGenres] = React.useState<string[]>([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchLanguages() {
            try {
                setLoading(true);
                const { response, error }: any = await movieApi.getAllGenres();
                if (!!error) throw new Error("INTERNAL SERVER");
                setGenres((_prev: string[]) => [..._prev, ...response.data]);
            } catch (error: any) {
                console.log("Error", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchLanguages();
    }, []);

    return { genres, loading, error };
};
