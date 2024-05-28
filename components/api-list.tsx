"use client ";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title={"GET"}
        desc={`${baseUrl}/${entityName}`}
        variant={"public"}
        className={""}
      />
      <ApiAlert
        title={"GET"}
        desc={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"public"}
        className={""}
      />
    </>
  );
};

export default ApiList;
