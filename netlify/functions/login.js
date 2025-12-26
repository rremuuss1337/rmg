exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const { email, password } = JSON.parse(event.body);

    // 🔥 TEST BYPASS MODU ACTIVE
    if (email === "test1@gmail.com" && password === "test") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          success: true, 
          username: "Remus Admin", 
          token: "bypass-token-123" 
        })
      };
    }

    return { statusCode: 401, body: JSON.stringify({ message: "Hatalı giriş!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};