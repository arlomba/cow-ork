import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function ProfilePage() {
  const { data: user, loading, error } = useFetch("/users/profile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setBio(user.bio);
      setAvatar(user.avatar);
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert color="error" icon="error">
        Error: {error.message}
      </Alert>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        bio,
      };

      const data = await fetchEndpoint(
        `/users/${user.id}`,
        token,
        "PUT",
        formData
      );

      if (data.status === "ok") {
        setErrorMessage("");
        setSuccessMessage(data);
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error);
    }
  };

  return (
    <section className="flex w-full items-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center gap-5 dark:text-white"
      >
        <div className="flex w-full justify-evenly gap-5">
          <div className="flex flex-col items-center justify-center gap-3">
            <Avatar size="xxxxl" src={`/images/avatars/${avatar}`} />

            <Input id="avatar" name="avatar" type="file" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-2/4 gap-3">
              <label className="block">
                <Typography
                  as="span"
                  className="block text-slate-700 dark:text-white"
                >
                  Nombre
                </Typography>

                <Input
                  id="first_name"
                  name="first_name"
                  value={firstName}
                  setValue={setFirstName}
                  className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
                />
              </label>

              <label className="block">
                <Typography
                  as="span"
                  className="block text-slate-700 dark:text-white"
                >
                  Apellidos
                </Typography>

                <Input
                  id="last_name"
                  name="last_name"
                  value={lastName}
                  setValue={setLastName}
                  className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
                />
              </label>
            </div>

            <label className="block">
              <Typography
                as="span"
                className="block text-slate-700 dark:text-white"
              >
                E-mail
              </Typography>

              <Input
                id="email"
                name="email"
                value={email}
                setValue={setEmail}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="span"
                className="block text-slate-700 dark:text-white"
              >
                Contraseña
              </Typography>

              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                setValue={setPassword}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="span"
                className="block text-slate-700 dark:text-white"
              >
                Confirmar contraseña
              </Typography>

              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={passwordConfirmation}
                setValue={setPasswordConfirmation}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="span"
                className="block text-slate-700 dark:text-white"
              >
                Biografía
              </Typography>

              <Input
                id="bio"
                name="bio"
                value={bio}
                setValue={setBio}
                multiline
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
              />
            </label>
          </div>
        </div>

        <Button size="sm" shape="rounded">
          Actualizar
        </Button>
      </form>

      {successMessage && (
        <Alert color="success" icon="success">
          {successMessage.message}
        </Alert>
      )}

      {errorMessage && (
        <Alert color="error" icon="error">
          {errorMessage.message}
        </Alert>
      )}
    </section>
  );
}
