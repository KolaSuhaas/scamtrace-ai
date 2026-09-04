export interface BrandMatchResult {
  claimedBrand: string;
  officialDomain: string | null;
}

const KNOWN_BRANDS = [
  {
    name: "Amazon",
    keywords: ["amazon"],
    domain: "amazon.com",
  },
  {
    name: "Microsoft",
    keywords: ["microsoft"],
    domain: "microsoft.com",
  },
  {
    name: "Google",
    keywords: ["google"],
    domain: "google.com",
  },
  {
    name: "TCS",
    keywords: ["tcs", "tata consultancy services"],
    domain: "tcs.com",
  },
  {
    name: "Infosys",
    keywords: ["infosys"],
    domain: "infosys.com",
  },
  {
    name: "Wipro",
    keywords: ["wipro"],
    domain: "wipro.com",
  },
  {
    name: "Accenture",
    keywords: ["accenture"],
    domain: "accenture.com",
  },
  {
    name: "Deloitte",
    keywords: ["deloitte"],
    domain: "deloitte.com",
  },
];

export function detectClaimedBrand(
  message: string
): BrandMatchResult {
  const text = message.toLowerCase();

  for (const brand of KNOWN_BRANDS) {
    if (
      brand.keywords.some((keyword) =>
        text.includes(keyword)
      )
    ) {
      return {
        claimedBrand: brand.name,
        officialDomain: brand.domain,
      };
    }
  }

  return {
    claimedBrand: "Unknown organization",
    officialDomain: null,
  };
}

export function isDomainConsistent(
  hostname: string,
  officialDomain: string | null
) {
  if (!officialDomain) {
    return null;
  }

  const host = hostname.toLowerCase();
  const official = officialDomain.toLowerCase();

  return (
    host === official ||
    host.endsWith(`.${official}`)
  );
}
