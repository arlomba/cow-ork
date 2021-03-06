import { useNavigate } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import AdminTools from "./AdminTools";
import Chip from "./Chip";
import Typography from "./Typography";

export default function ReportCard({ report, setIsOpen, setSelectedItem }) {
  const navigate = useNavigate();

  return (
    <article
      key={report.id}
      className="flex flex-col rounded border shadow md:flex-row"
    >
      <div className="flex w-full flex-col gap-5 p-5">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Typography size="xxl" weight="bold">
              {report.space_name}
            </Typography>

            {report.status === "PENDING" && (
              <Chip color="warning">Pendiente</Chip>
            )}

            {report.status === "OPEN" && <Chip color="success">Abierto</Chip>}

            {report.status === "CLOSED" && <Chip color="error">Cerrado</Chip>}
          </div>

          <div>
            <AdminTools
              handleDelete={() => {
                setIsOpen(true);
                setSelectedItem(report.id);
              }}
              handleEdit={() => navigate(`/reports/${report.id}/edit`)}
            />
          </div>
        </div>

        <section className="flex flex-col space-y-2">
          <article>
            <Typography as="h3" size="xl" className="underline">
              Categoría:
            </Typography>

            <Typography>{report.category_name}</Typography>
          </article>

          <article>
            <Typography as="h3" size="xl" className="underline">
              Descripción:
            </Typography>

            <Typography>{report.description}</Typography>
          </article>

          <article>
            <Typography as="h3" size="xl" className="underline">
              Fecha del reporte:
            </Typography>

            <Typography>{formatDate(report.created_at)}</Typography>
          </article>
        </section>
      </div>
    </article>
  );
}
