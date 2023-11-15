import {
  writeFile,
  appendFile,
  readFile,
  rename,
  copyFile,
  unlink,
} from "fs/promises";
import path from "path";

export const srcPath = (filePath) => {
  return path.join(path.resolve(), filePath);
};

export const newName = (filename) => {
  let ext = filename.split(".").pop();
  return Date.now() + "." + ext;
};

export const newNames = (filename) => {
  let ext = filename.split(".").pop();
  if (ext === "jpg" || ext === "png" || ext === "PNG" || ext === "JPG") {
    let name = newName(filename);
    let smallName = "small-" + name;
    let mediumName = "medium-" + name;
    let largeName = "large-" + name;
    let names = [name, smallName, mediumName, largeName];
    return names;
  }
  return null;
};


/*export const __galeria = srcPath("\\data\\img\\galeria\\"),
  __servicios = srcPath("\\data\\img\\servicios\\"),
  __usuarios = srcPath("\\data\\img\\usuarios\\"),
  __carruselhome = srcPath("\\data\\img\\carrusel_home\\"),
  __equipo = srcPath("\\data\\img\\equipo\\"),
  __diplomas = srcPath("\\data\\img\\diplomas\\"),
  __testimonios = srcPath("\\data\\img\\testimonios\\");*/

  export const __galeria = path.resolve('src', 'data','img','galeria'),
  __servicios = path.resolve('src', 'data','img','servicios'),
  __usuarios = path.resolve('src', 'data','img','usuarios'),
  __carruselhome = path.resolve('src', 'data','img','carrusel_home'),
  __equipo = path.resolve('src', 'data','img','equipo'),
  __diplomas = path.resolve('src', 'data','img','diplomas'),
  __testimonios = path.resolve('src', 'data','img','testimonios');

export const createFile = async (filePath, data = "") => {
  try {
    await writeFile(filePath, data);
    console.log("Archivo creado: ", srcPatholver);
  } catch (error) {
    console.log("Error al crear el archivo.");
  }
};

export const writeAll = async (filePath, data = "") => {
  try {
    await writeFile(filePath, data);
    console.log("Sobreescribiendo datos en: ", srcPatholver);
  } catch (error) {
    console.log("Error al editar el archivo.");
  }
};

export const writeLine = async (filePath, data = "") => {
  try {
    await appendFile(filePath, `\n${data}`, { flag: "a" });
    console.log("Se ha escrito una nueva linea en: ", srcPatholver);
  } catch (error) {
    console.log("Error al editar el archivo.");
  }
};

export const readAll = async (filePath, data = "") => {
  try {
    const file = await readFile(filePath);
    console.log("Archivo: " + filePath, "\n" + file.toString());
    return file.toString();
  } catch (error) {
    console.log("Error al leer el archivo.");
  }
};

export const renameFile = async (filePath, newName) => {
  try {
    const arr = filePath.split("\\");
    arr.length -= 1;
    const srcPatholverTo = arr.join("\\") + "\\" + newName;
    await rename(filePath, srcPatholverTo);
    console.log(
      "Archivo renombrado con éxito.",
      "\n",
      "From >>> " + filePath,
      "\n",
      "To   >>> " + srcPatholverTo
    );
  } catch (error) {
    console.log("Error al renombrar el archivo.");
    console.log(error);
  }
};

export const move = async (from, to) => {
  try {
    await rename(from, to);
    console.log(
      "Archivo movido con éxito.",
      "\n",
      "From >>> " + from,
      "\n",
      "To   >>> " + to
    );
  } catch (error) {
    console.log("Error al mover el archivo.");
    console.log(error);
  }
};

export const copy = async (from, to) => {
  try {
    await copyFile(from, to);
    console.log(
      "Archivo copiado con éxito.",
      "\n",
      "From >>> " + from,
      "\n",
      "To   >>> " + to
    );
  } catch (error) {
    console.log("Error al copiar el archivo.");
    console.log(error);
  }
};

export const deleteFile = async (filePath) => {
  try {
    await unlink(filePath);
    console.log("Archivo eliminado: ", filePath);
  } catch (error) {
    console.log("Error al eliminar el archivo.");
    console.log(error);
  }
};

//************************************************************************************/
