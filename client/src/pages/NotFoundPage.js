import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ErrorPage from "../components/ErrorPage";
import Typography from "../components/Typography";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ErrorPage image="pageNotFound.svg">
      <Typography as="h3" weight="bold" size="xxl">
        Página no encontrada
      </Typography>

      <Button shape="rounded" size="sm" onClick={() => navigate(-1)}>
        Volver atrás
      </Button>
    </ErrorPage>
  );
}
