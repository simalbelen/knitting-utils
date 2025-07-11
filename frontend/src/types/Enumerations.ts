const Plan = ["standard", "finance", "company"];
const Interval = ["monthly", "annual"];
const Country = ["ES", "CL", "CO", "MX"];
const IdType = ["CIF", "VAT"];

const PlanName = {
  standard: "Estándar",
  finance: "Finanzas",
  company: "Empresa",
};

const IntervalName = { monthly: "Mensual", annual: "Anual" };
const CountryName = {
  ES: "España",
  CL: "Chile",
  CO: "Colombia",
  MX: "México",
};

const IdTypeName = { CIF: "CIF", VAT: "VAT" };

export { Plan, PlanName, Interval, IntervalName, Country, CountryName, IdType, IdTypeName };
