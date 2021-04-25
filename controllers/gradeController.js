import { db } from '../models/index.js';
import { gradesModel } from '../models/gradesModel.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    console.log(req.body);
    const grade = new gradesModel(req.body);
    console.log(grade);
    await grade.save();
    res.status(200).send(grade);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};
//ok
const findAll = async (req, res) => {
  const name = req.query.name;
  console.log(name);
  //condicao para o filtro no findAll

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await gradesModel.find({});
    res.status(200).send(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
//ok
const findOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const grade = await gradesModel.findById(id);

    res.status(200).send(grade);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
//ok
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const grade = await gradesModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send(grade);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};
//ok
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const grade = await gradesModel.findByIdAndDelete({ _id: id }, req.body);
    res.status(200).send(grade);
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const grades = await gradesModel.deleteMany({});
    logger.info(`DELETE /grade`);
    res.status(200).send('Todas as contas foram excluidas');
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
