import React from "react";
import movieApi from "service/movie.service";

const useSearch = () => {
    const [options, setOptions] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const onSearch = async (q: string) => {
        try {
            setLoading(true);
            const { response, error }: any = await movieApi.searchMovie({ q });
            if (!!error) throw new Error(error.message);

            const movies = response.data.map((values: { _id: string; title: string }) => {
                const { _id, title } = values;
                return {
                    label: title,
                    value: title,
                    key: _id,
                };
            });
            // return movies;

            setOptions((prev) => (prev = movies));
        } catch (error: any) {
            console.log("error", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { onSearch, options, loading, error };
};

export default useSearch;
