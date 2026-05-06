export const handler = async (event : any) => {
  try {
    console.log("Incoming event:", JSON.stringify(event));

    // support both direct invoke and API Gateway
    let input = event;

    if (event.body) {
      input = JSON.parse(event.body);
    }

    const name = input.name || "Guest";

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello ${name} 👋`,
      }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Something went wrong",
      }),
    };
  }
};