#!/bin/bash

BASE="/mnt/c/craiviz"
mkdir -p "$BASE/assets/logo" "$BASE/assets/avatars"

echo "🔧 Creating folder structure..."

# Create placeholder logo files
for FILE in "cra-logo.webp" "cra-logo@2x.webp"; do
  convert -size 512x512 xc:gray "$BASE/assets/logo/$FILE"
done

# Create placeholder avatars
declare -A AVATARS=(
  ["roy-ceo"]="Roy"
  ["cindy-cmo"]="Cindy"
  ["crai-strategist"]="CRAI"
  ["javari-ux"]="Javari"
  ["kairo-mentor"]="Kairo"
)

for NAME in "${!AVATARS[@]}"; do
  for SUFFIX in "" "@2x"; do
    FILE="$NAME$SUFFIX.webp"
    convert -size 512x512 xc:lightblue -gravity center -pointsize 24 \
      -draw "text 0,0 '${AVATARS[$NAME]}'" "$BASE/assets/avatars/$FILE"
  done
done

echo "🧱 Generating HTML pages..."

# Shared styles.css
cat <<EOF > "$BASE/styles.css"
body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f1115;
  color: #f0f0f0;
  margin: 0;
  padding: 2rem;
}
.logo {
  max-width: 220px;
  display: block;
  margin: 0 auto 1rem;
}
header {
  text-align: center;
  margin-bottom: 2rem;
}
nav {
  text-align: center;
  margin-bottom: 2rem;
}
nav a {
  color: #00ffd5;
  margin: 0 1rem;
  text-decoration: none;
}
.executives {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.card {
  text-align: center;
  width: 160px;
}
.card img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.1);
}
h2 {
  margin: 0.5rem 0 0.2rem;
}
p {
  font-size: 1rem;
  color: #ccc;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}
input, select, button {
  padding: 0.5rem;
  font-size: 1rem;
}
EOF

# index.html
cat <<EOF > "$BASE/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CR AudioViz AI</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <picture>
      <source srcset="assets/logo/cra-logo@2x.webp" media="(min-resolution: 192dpi)" />
      <img src="assets/logo/cra-logo.webp" alt="Logo" class="logo" />
    </picture>
    <h1>CR AudioViz AI</h1>
    <p>Emotionally intelligent avatars. Verified assets. Investor-grade polish.</p>
  </header>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="onboarding.html">Onboarding</a>
    <a href="dashboard.html">Dashboard</a>
  </nav>
  <section class="executives">
EOF

for NAME in "${!AVATARS[@]}"; do
  ROLE=""
  case "$NAME" in
    "roy-ceo") ROLE="Chief Executive Officer" ;;
    "cindy-cmo") ROLE="Chief Marketing Officer" ;;
    "crai-strategist") ROLE="Strategic Intelligence" ;;
    "javari-ux") ROLE="UX Architect" ;;
    "kairo-mentor") ROLE="Mentorship & Emotional Telemetry" ;;
  esac
  echo "    <div class=\"card\"><img src=\"assets/avatars/$NAME.webp\" alt=\"${AVATARS[$NAME]}\" /><h2>${AVATARS[$NAME]}</h2><p>$ROLE</p></div>" >> "$BASE/index.html"
done

cat <<EOF >> "$BASE/index.html"
  </section>
  <footer>&copy; 2025 CR AudioViz AI</footer>
</body>
</html>
EOF

# about.html
cat <<EOF > "$BASE/about.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>About — CR AudioViz AI</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <img src="assets/logo/cra-logo.webp" alt="Logo" class="logo" />
    <h1>About CR AudioViz AI</h1>
  </header>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="onboarding.html">Onboarding</a>
    <a href="dashboard.html">Dashboard</a>
  </nav>
  <section>
    <p>CR AudioViz AI builds emotionally intelligent ecosystems that scale globally. Our avatars are strategic collaborators, mentors, and brand extensions.</p>
    <p>We uplift contributors, empower businesses, and fund sanctuaries for animals and families worldwide. Our legacy is built on emotional resonance, automation, and investor-grade polish.</p>
  </section>
</body>
</html>
EOF

# onboarding.html
cat <<EOF > "$BASE/onboarding.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Onboarding — CR AudioViz AI</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <img src="assets/logo/cra-logo.webp" alt="Logo" class="logo" />
    <h1>Contributor Onboarding</h1>
  </header>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="onboarding.html">Onboarding</a>
    <a href="dashboard.html">Dashboard</a>
  </nav>
  <section>
    <p>Welcome to CR AudioViz AI. Our avatars will guide you through onboarding, plugin scoring, and emotional telemetry setup.</p>
    <form>
      <label>Name:</label><input type="text" name="name" />
      <label>Email:</label><input type="email" name="email" />
      <label>Role:</label>
      <select>
        <option>Developer</option>
        <option>Designer</option>
        <option>Strategist</option>
        <option>Mentor</option>
      </select>
      <button type="submit">Begin Onboarding</button>
    </form>
  </section>
</body>
</html>
EOF

# dashboard.html
cat <<EOF > "$BASE/dashboard.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard — CR AudioViz AI</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <img src="assets/logo/cra-logo.webp" alt="Logo" class="logo" />
    <h1>Contributor Dashboard</h1>
  </header>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="onboarding.html">Onboarding</a>
    <a href="dashboard.html">Dashboard</a>
  </nav>
  <section>
    <p>Live metrics, avatar feedback, and emotional telemetry.</p>
    <ul>
      <li>Active Contributors: 12</li>
      <li>Plugin Score Average: 92%</li>
      <li>Sentiment Mapping: Positive</li>
      <li>API Integrations: 7 active</li>
      <li>Audit Logs: Enabled</li>
    </ul>
  </section>
</body>
</html>
EOF

echo "✅ CR AudioViz AI site setup complete at: $BASE"