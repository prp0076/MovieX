import React from "react";

import Carousel from "../../../components/Carousel/Carousel";
import useFetch from "../../../hooks/usefetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
    // console.log("similar");
//    console.log(data);
    return (
        <Carousel
            title={title}
            data={data?.data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;