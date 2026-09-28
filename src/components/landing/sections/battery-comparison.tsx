import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { batteryComparison } from "@/content/landing";

export function BatteryComparison() {
  const { columns, rows, choices } = batteryComparison;

  return (
    <section id="energia" className="scroll-mt-20 bg-void">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div>
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {batteryComparison.eyebrow}
            </p>
            <h2
              data-anim
              className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl"
            >
              {batteryComparison.headingLead}{" "}
              <span className="text-brand-400">
                {batteryComparison.headingAccent}
              </span>
            </h2>
          </div>
          <p
            data-anim
            className="max-w-sm text-[15px] leading-7 text-white/50 lg:justify-self-end"
          >
            {batteryComparison.aside}
          </p>
        </div>

        <div
          data-anim
          className="mt-14 overflow-x-auto rounded-2xl border border-white/10 bg-panel"
        >
          <table className="w-full min-w-[32rem] border-collapse text-left">
            <caption className="sr-only">
              Comparación de baterías de litio y plomo para motos eléctricas
            </caption>
            <thead>
              <tr className="border-b border-white/10">
                <th
                  scope="col"
                  className="px-5 py-5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 sm:px-8"
                >
                  Criterio
                </th>
                {columns.map((column) => (
                  <th
                    key={column.name}
                    scope="col"
                    className="px-5 py-5 sm:px-6"
                  >
                    <span className="block text-sm font-semibold text-white">
                      {column.name}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                      {column.detail}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                  <th
                    scope="row"
                    className="px-5 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45 sm:px-8"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${columns[index].name}`}
                      className="px-5 py-4 text-sm leading-6 text-white/80 sm:px-6"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul data-anim-group className="mt-4 grid gap-4 md:grid-cols-2">
          {choices.map((item) => (
            <li
              key={item.title}
              data-anim
              className="rounded-2xl border border-white/10 bg-panel p-6"
            >
              <span className="text-brand-400">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/45">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
