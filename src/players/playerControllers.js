import { ObjectId } from "mongodb";
import client from "../common/bd.js";

const DB_NAME = "premierleague";
const COLLECTION = "best_players";

// POST /player — Insertar jugador
export const insertPlayer = async (req, res) => {
  const {
    name,
    country,
    age,
    lastEnglishTeam,
    isRetired,
    position,
    isFACupWinner,
    weightInKilos,
    heightInCentimeters,
  } = req.body;

  const newPlayer = {
    name,
    country,
    age,
    lastEnglishTeam,
    isRetired,
    position,
    isFACupWinner,
    weightInKilos,
    heightInCentimeters,
  };

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(newPlayer);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
};

// GET /players — Obtener todos los jugadores
export const findPlayers = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const players = await collection.find().toArray();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
};

// GET /player/:id/get — Obtener jugador por ID
export const findPlayerById = async (req, res) => {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const player = await collection.findOne({ _id: objectId });

    if (!player) {
      return res.status(404).send();
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
};

// PUT /player/:id/update — Actualizar jugador por ID
export const updatePlayerById = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const query = { $set: req.body };
    const result = await collection.updateOne({ _id: objectId }, query);

    if (result.matchedCount === 0) {
      return res.status(404).send();
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
};

// DELETE /player/:id/delete — Eliminar jugador por ID
export const deletePlayerById = async (req, res) => {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).send();
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
};
