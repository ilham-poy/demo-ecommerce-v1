import { useRouter } from "next/router";


const CategoryProductPage = () => {
    const { query } = useRouter();
    return (
        <div>
            <div>
                <h2>
                    Category Product Page
                </h2>
                <p>
                    {` Category : ${query.segment && query.segment[0] ? query.segment[0] : "-"}`}
                </p>
                <p>
                    {` Category 2 :${query.segment && query.segment[1] ? query.segment[1] : "-"}`}
                </p>
            </div>
        </div>
    )
}

export default CategoryProductPage;