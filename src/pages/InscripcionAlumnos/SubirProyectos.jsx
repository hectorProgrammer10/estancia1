import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/seccioncss.css';
import '../InscripcionAlumnos/subirProyectos.css';
import '../../assets/css/toolTips.css'

function SubirProyectos() {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [videoPitch, setVideoPitch] = useState('');
  const [fichaTecnica, setFichaTecnica] = useState(null);
  const [modeloCanva, setModeloCanva] = useState(null);
  const [pdfProyecto, setPdfProyecto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleArchivoChange = (event, setArchivo) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setArchivo(file);
    } else {
      event.target.value = '';
      setArchivo(null);
      alert('Por favor, sube un archivo PDF.');
    }
  };

  const handleGuardar = () => {
    setIsLoading(true);
    if (!nombreProyecto || !descripcion || !videoPitch || !fichaTecnica || !modeloCanva || !pdfProyecto) {
      alert('Por favor, complete todos los campos.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('nombreProyecto', nombreProyecto);
    formData.append('descripcion', descripcion);
    formData.append('videoPitch', videoPitch);
    formData.append('fichaTecnica', fichaTecnica);
    formData.append('modeloCanva', modeloCanva);
    formData.append('pdfProyecto', pdfProyecto);

    const token = localStorage.getItem('token');

    fetch(import.meta.env.VITE_API_UPLO, {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData,
    }).then(response => {
      if (response.ok) {
        alert('Datos guardados con éxito.');
        setTimeout(() => {
          navigate('/alumno');
        }, 1000); 
      } else {
        alert(`Error al guardar los datos: ${response.statusText} : ¿inicio de sesión?`);

      }
    }).catch(error => {

      alert('Error en el servidor');
    }).finally(() =>{
      setIsLoading(false);
    });


  };

  const handleBorrarFormulario = () => {
    setNombreProyecto('');
    setDescripcion('');
    setVideoPitch('');
    setFichaTecnica(null);
    setModeloCanva(null);
    setPdfProyecto(null);
    document.getElementById('fichaTecnica').value = '';
    document.getElementById('modeloCanva').value = '';
    document.getElementById('pdfProyecto').value = '';
  };

  return (
    <div className='seccion_canva'>
      {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
      <div className='seccion_container box'>
        <div className="seccion_apartado box3 bordeW">
          <div className="sProyectos_descripcion">
            <h1>Formulario de Entrega de Proyectos</h1>
            <p>Este formulario se utiliza para que los alumnos suban los documentos de sus proyectos en formato 
              <span> PDF</span>.</p> 
            <p>Por favor, asegúrate de que los archivos estén correctamente nombrados y sean legibles.</p>
            <span> *Todos los campos son necesarios llenarlos</span>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label>Nombre del proyeto: <span>*</span></label>
            <input type="text" className='borde2' value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="">Descripción del proyecto: <span>*</span></label><br />
            <textarea name="" id="" cols="50" rows="5" className='borde2' placeholder='escribe aqui una breve descripción del proyecto.' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="">Liga del video pitch (explicación del proyecto):<span id='anuncio_sProyectos'> *youtube o drive, El video no deberá tener restricción de acceso, para que el evaluador pueda visualizar el video pitch.</span></label>
            <input type="text" className='borde2' value={videoPitch} onChange={(e) => setVideoPitch(e.target.value)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="fichaTecnica">Ficha técnica: <span>*pdf</span></label>
            <input type="file" id="fichaTecnica" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setFichaTecnica)} />
          </div>
          <div>
            <div className="tooltip">?
              <span className="tooltiptextLeft bordeW">
                <p>*Todos los ejemplos están en "recursos" <br /> disponible para descargar</p>
              </span>
            </div>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="modeloCanva">Modelo canva: <span>*pdf</span></label>
            <input type="file" id="modeloCanva" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setModeloCanva)} />
          </div>
          <div>
            <div className="tooltip">?
              <span className="tooltiptextLeft bordeW">
                <p>*Todos los ejemplos están en "recursos" <br /> disponible para descargar</p>
              </span>
            </div>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="pdfProyecto">Resumen ejecutivo: <span>*pdf</span></label>
            <input type="file" id="pdfProyecto" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setPdfProyecto)} />
          </div>
          <div>
            <div className="tooltip">?
              <span className="tooltiptextLeft bordeW">
                <p>*Todos los ejemplos están en "recursos" <br /> disponible para descargar</p>
              </span>
            </div>
          </div>
        </div>
        <div className="seccion_apartado box3 form_btns">
          <button id='guardar_sProyectos' className='bordeW' onClick={handleGuardar}>Guardar</button>
          <button id='borrar_sProyectos' onClick={handleBorrarFormulario}>Borrar formulario</button>
        </div>
      </div>
    </div>
  );
}

export default SubirProyectos;
