server.all("*", (req, res) => {
  return handle(req, res);
});

server.use((req, res) => app.getRequestHandler()(req, res));
