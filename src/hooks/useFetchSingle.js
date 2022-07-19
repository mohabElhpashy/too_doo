import { useQuery } from "react-query";
import service from "auth/FetchInterceptor";
const useSingleObject = (endPointRequest) => {
  const { data, ...rest } = useQuery(
    // "weddingHallReservation",
    `${endPointRequest}`,
    async () => {
      const res = await service.get(`/web/${endPointRequest}`);
      if (!res.record) {
        return res.data;
      } else {
        return res.record;
      }
    },

    { retry: false }
  );

  return {
    services: data,
    ...rest,
  };
};
export default useSingleObject;
