import { CheckIcon } from "@heroicons/react/outline";
import type { Product, Price } from "@invertase/firestore-stripe-payments";

type PWithPrices = Product & { prices?: Price[] };

interface Props {
  products: PWithPrices[];
  selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: Props) {
  const fmt = (amount: number | null | undefined, currency?: string) => {
    if (amount == null) return "—";
    const cur = (currency ?? "USD").toUpperCase();
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: cur,
        maximumFractionDigits: 0,
      }).format(amount / 100);
    } catch {
      return `${cur}${Math.round(amount / 100)}`;
    }
  };

  return (
    <table className="w-full text-left text-sm md:text-base">
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((product) => {
            const price = product.prices?.[0];
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"
                }`}
              >
                {fmt(price?.unit_amount, price?.currency)}
              </td>
            );
          })}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"
              }`}
            >
              {product.metadata?.videoQuality ?? "—"}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id ? "text-[#E50914]" : "text-[gray]"
              }`}
            >
              {product.metadata?.resolution ?? "—"}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id ? "text-[#E50914]" : "text-[gray]"
              }`}
            >
              {product.metadata?.portability === "true" && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
