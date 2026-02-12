const UNITY_GAME_ID_ANDROID = "6044901";

const helperText = document.getElementById("helperText");
const fields = {
  country: document.getElementById("country"),
  region: document.getElementById("region"),
  city: document.getElementById("city"),
  ip: document.getElementById("ip"),
};

async function hydrateLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    fields.country.textContent = data.country_code || "--";
    fields.region.textContent = data.region || "Unknown";
    fields.city.textContent = data.city || "Unknown";
    fields.ip.textContent = data.ip || "Unknown";
  } catch {
    helperText.textContent =
      "Unable to fetch live IP/location in this environment. Showing defaults.";
  }
}

function handleAdButton(adType) {
  helperText.textContent = `${adType} clicked for game ID ${UNITY_GAME_ID_ANDROID}. Connect your official Unity Ads integration and follow policy-compliant traffic practices.`;
}

document
  .getElementById("interstitialBtn")
  .addEventListener("click", () => handleAdButton("INTERSTITIAL"));

document
  .getElementById("rewardedBtn")
  .addEventListener("click", () => handleAdButton("REWARDED"));

hydrateLocation();
