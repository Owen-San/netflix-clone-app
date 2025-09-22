import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CheckIcon } from "@heroicons/react/outline";
import type { Product } from "@invertase/firestore-stripe-payments";
import Table from "./Table";
import Loader from "./Loader"
import { loadCheckout } from "../lib/stripe";

interface Props {
  products?: Product[];
}

function Plans({ products = [] }: Props) {
  const { logout,user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2] ?? null);
  const [isBillingLoading, setBillingLoading] = useState(false)

  const subscribeToPlan = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
  }

  useEffect(() => {
    if (!selectedPlan && products.length) setSelectedPlan(products[2]);
  }, [products, selectedPlan]);

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414] flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image
            src="/netflix-logo.svg"
            alt="Netflix Logo"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
            priority
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline cursor-pointer"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>

        <ul className="space-y-2">
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-6">
          <div className="flex w-full items-center justify-center self-end md:w-3/5 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox cursor-pointer ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <div className="w-full overflow-x-auto">
            <Table products={products} selectedPlan={selectedPlan} />
          </div>

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;