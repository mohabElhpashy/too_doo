import { useQuery } from "react-query";
import service from "auth/FetchInterceptor";
const useReservations = (endPointRequest) => {
  const { data, ...rest } = useQuery(
    // "weddingHallReservation",
    `${endPointRequest}`,
    async () => {
      const res = await service.get(`/web/${endPointRequest}`);
      if (res.data) {
        return res.data;
      } else if (res.top_sellers) {
        return res.top_sellers;
      } else {
        return res.records;
      }
    },
    { retry: false }
  );
  return {
    services: data,
    ...rest,
  };
};
export default useReservations;
