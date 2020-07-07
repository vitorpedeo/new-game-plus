const yup = require('yup');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const signUpSchema = (req, res, next) => {
  const data = req.body;

  const schema = yup.object().shape({
    name: yup.string().required('Insira seu nome.'),
    whatsApp: yup
      .string()
      .length(11, 'Número inválido.')
      .required('Insira seu número.'),
    uf: yup.string().length(2).required('Insira seu estado.'),
    city: yup.string().required('Insira sua cidade.'),
    email: yup.string().email('Email inválido.').required('Insira seu email.'),
    password: yup
      .string()
      .min(5, 'Sua senha deve ter no mínimo ${min} caracteres.')
      .max(20, 'Sua senha deve ter no máximo ${max} caracteres.')
      .required(''),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      unlinkAsync(req.file.path);

      return res.badRequest('Campo(s) inválido(s).', { errors: err.errors });
    });
};

const signInSchema = (req, res, next) => {
  const data = req.body;

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido.').required('Insira seu email.'),
    password: yup.string().required('Insira sua senha.'),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      return res.badRequest('Campo(s) inválido(s).', { errors: err.errors });
    });
};

const gameSchema = (req, res, next) => {
  const data = req.body;

  const schema = yup.object().shape({
    title: yup.string().required('Insira o nome do jogo.'),
    description: yup.string().required('Insira uma breve descrição.'),
    platform: yup.string().required('Insira a plataforma.'),
    uf: yup.string().length(2).required('Insira seu estado.'),
    city: yup.string().required('Insira sua cidade.'),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      unlinkAsync(req.file.path);

      return res.badRequest('Campo(s) inválido(s).', { errors: err.errors });
    });
};

module.exports = { signUpSchema, signInSchema, gameSchema };
