// Native fetch is available in Node.js 18+

// CONFIGURATION
const API_URL = 'http://localhost:3000/api/honeypot';
// defaults to the auth key in your .env.local or a placeholder meant to match it
const API_KEY = process.env.GUVI_AUTH_KEY || 'project-die-secure-v1'; 

async function testHoneypot() {
  console.log("👴 Dada Ji Honeypot Tester 👴");
  console.log(`Target: ${API_URL}`);
  
  const payload = {
    message: "Hello sir, I am calling from your bank. You need to update KYC immediately or account blocked. Send OTP.",
    history: [],
    sessionId: "test-session-123"
  };

  console.log("\n📨 Sending Scammer Message:");
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        console.error(`\n❌ API Error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(text);
        return;
    }

    const data = await response.json();
    console.log("\n✅ Response Received:");
    console.log(JSON.stringify(data, null, 2));

    console.log("\n🔍 Analysis:");
    console.log(`- Scam Detected: ${data.scam_detected ? 'YES' : 'NO'}`);
    console.log(`- Persona Reply: "${data.response_message}"`);
    console.log(`- Intel Extracted: ${JSON.stringify(data.extracted_intel)}`);

  } catch (error) {
    console.error("\n❌ Request Failed:", error);
  }
}

// Check if server is likely running
console.log("Ensure 'npm run dev' is running in another terminal!");
testHoneypot();
