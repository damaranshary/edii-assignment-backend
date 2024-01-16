import authService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const userId = await authService.register(req.body);

    if (!userId) {
      res.status(500).send({
        message: "Error creating user",
      });
    }

    res.status(201).send({
      message: "User created",
      userId: userId,
    });
  } catch {
    res.status(500).send({
      message: "Error creating user",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);

    if (!user) {
      res.status(404).send({
        message: "email or password is incorrect",
      });
    }

    res.status(200).send({
      message: "Login success",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).send({
      message: "email or password is incorrect",
    });
  }
};

export default {
  register,
  login,
};
