import React from "react";

const PricingItem = ({ feature, price }) => (
  <div className="flex justify-between py-1 border-b border-gray-200">
    <span>{feature}</span>
    <span className="font-semibold">{price}</span>
  </div>
);

export const PricingSection = ({ t }) => {
  return (
    <section className="mb-16">
      <h3 className="text-3xl font-semibold mb-6 text-center">{t?.pricing?.title || "Pricing"}</h3>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h4 className="text-xl font-semibold mb-4">{t?.pricing?.subtitle || "Pay per use of Talent AI"}</h4>
        <div className="space-y-1">
          {t?.pricing?.items?.map(({ label, value }) => (
            <PricingItem feature={label} price={value} />
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <h4 className="text-xl font-semibold mb-4">{t?.pricing?.creditPricing?.title}</h4>
        <p className="mb-4">{t?.pricing?.creditPricing?.description}</p>
      </div>
    </section>
  );
};
