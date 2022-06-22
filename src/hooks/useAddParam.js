import { useSearchParams } from "react-router-dom";

// TODO: right now only searching for single field (only one govlaw)
/** Add search parameter.  */
const useAddParam = (type, id, value) => {
  const [searchParams, setSearchParams] = useSearchParams();

  switch (type) {
    case "tag":
      let newTags = [id];
      if (searchParams.has("tag")) {
        const prev = JSON.parse(decodeURIComponent(searchParams.get("tags")));
        newTags = prev.push(id);
      }
      setSearchParams({ tags: encodeURIComponent(JSON.stringify(newTags)) });
      break;
    case "field":
      setSearchParams({ [id]: value });
      break;
    default:
      throw new Error("Unsupported parameter type");
  }
};

export default useAddParam;