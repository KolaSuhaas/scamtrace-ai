export interface UrlAnalysis {
  hostname: string;
  protocol: string;
  usesHttps: boolean;
  suspicious: boolean;
  reasons: string[];
}

export function analyzeUrl(url: string): UrlAnalysis {
  const reasons: string[] = [];

  try {
    const parsed = new URL(url);

    const hostname = parsed.hostname.toLowerCase();
    const protocol = parsed.protocol;
    const usesHttps = protocol === "https:";

    if (!usesHttps) {
      reasons.push("URL does not use HTTPS");
    }

    const suspiciousTlds = [
      ".xyz",
      ".top",
      ".click",
      ".buzz",
      ".work",
    ];

    if (suspiciousTlds.some((tld) => hostname.endsWith(tld))) {
      reasons.push("Domain uses a potentially suspicious top-level domain");
    }

    if (hostname.split("-").length >= 3) {
      reasons.push("Domain contains multiple hyphen-separated terms");
    }

    if (hostname.length > 40) {
      reasons.push("Domain name is unusually long");
    }

    if (hostname.includes("login") || hostname.includes("verify")) {
      reasons.push("Domain contains credential-related terminology");
    }

    return {
      hostname,
      protocol,
      usesHttps,
      suspicious: reasons.length > 0,
      reasons,
    };
  } catch {
    return {
      hostname: "Invalid URL",
      protocol: "Unknown",
      usesHttps: false,
      suspicious: true,
      reasons: ["URL could not be parsed"],
    };
  }
}
