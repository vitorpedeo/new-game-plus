const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const CONTENT_TYPE = 'application/json';

const ok = function (message, data, metadata) {
  const status = STATUS_OK;
  message = message ? message : 'Requisição efeituada com sucesso.';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(CONTENT_TYPE);

  return this.json({ status, message, data, metadata });
};

const badRequest = function (message, data, metadata) {
  const status = STATUS_BAD_REQUEST;
  message = message ? message : 'Erro na requisição.';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(CONTENT_TYPE);

  return this.json({ status, message, data, metadata });
};
const unauthorized = function (message, data, metadata) {
  const status = STATUS_UNAUTHORIZED;
  message = message ? message : 'Não autorizado.';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(CONTENT_TYPE);

  return this.json({ status, message, data, metadata });
};
const notFound = function (message, data, metadata) {
  const status = STATUS_NOT_FOUND;
  message = message ? message : 'Conteúdo não encontrado.';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(CONTENT_TYPE);

  return this.json({ status, message, data, metadata });
};
const serverError = function (message, data, metadata) {
  const status = STATUS_SERVER_ERROR;
  message = message ? message : 'Erro no servidor.';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(CONTENT_TYPE);

  return this.json({ status, message, data, metadata });
};

const responseStandard = (req, res, next) => {
  res.ok = ok;
  res.badRequest = badRequest;
  res.unauthorized = unauthorized;
  res.notFound = notFound;
  res.serverError = serverError;

  next();
};

module.exports = responseStandard;
