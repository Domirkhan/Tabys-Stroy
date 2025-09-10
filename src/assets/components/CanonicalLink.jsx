import { useLocation } from "react-router-dom";

function CanonicalLink() {
  const location = useLocation();
  return (
    <link rel="canonical" href={`https://tabys-stroy.kz${location.pathname}`} />
  );
}

export default CanonicalLink;
