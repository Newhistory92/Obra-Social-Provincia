"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page/select-user/page",{

/***/ "(app-pages-browser)/./src/app/Component/typeSelect/typeAfiliado.tsx":
/*!*******************************************************!*\
  !*** ./src/app/Component/typeSelect/typeAfiliado.tsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Input/Input.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"(app-pages-browser)/./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var _afiliados_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../afiliados.json */ \"(app-pages-browser)/./src/afiliados.json\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst TypeAfiliado = ()=>{\n    _s();\n    const [authenticated, setAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [dni, setDni] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [selectedUser, setSelectedUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Inicializar errorMessage como una cadena vacía\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Realizar la verificación del usuario al cargar el componente\n        const verifyUser = async ()=>{\n            try {\n                const response = await fetch(\"/api/handlerafiliado\");\n                const data = await response.json();\n                if (response.ok && data.status === 200) {\n                    setAuthenticated(true);\n                    setLoading(false);\n                } else {\n                    setLoading(false);\n                }\n            } catch (error) {\n                console.error(\"Error al verificar el usuario:\", error);\n                setLoading(false);\n            }\n        };\n        verifyUser();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Verificar si el usuario está autenticado y su ID está en la base de datos\n        const checkUserAuthentication = async ()=>{\n            if (authenticated) {\n                try {\n                    const response = await fetch(\"/api/handlerafiliado\");\n                    const data = await response.json();\n                    if (response.ok && data.status === 200 && data.isAuthenticatedAndInDatabase) {\n                        // El usuario está autenticado y su ID está en la base de datos\n                        // Redirigir al dashboard de afiliado\n                        window.location.href = \"/page/dashboard/afiliado\";\n                    } else {\n                        // El usuario no está autenticado o su ID no está en la base de datos\n                        // Redirigir al inicio de sesión\n                        window.location.href = \"/signin\";\n                    }\n                } catch (error) {\n                    console.error(\"Error al verificar la autenticaci\\xf3n del usuario:\", error);\n                    react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Ocurri\\xf3 un error al verificar la autenticaci\\xf3n del usuario\");\n                }\n            }\n        };\n        checkUserAuthentication();\n    }, [\n        authenticated\n    ]);\n    const handleInputChange = (event)=>{\n        const sanitizedValue = event.target.value.replace(/\\D/g, \"\").slice(0, 8);\n        setDni(sanitizedValue);\n        const user = _afiliados_json__WEBPACK_IMPORTED_MODULE_3__.find((afiliado)=>afiliado.dni === sanitizedValue);\n        setSelectedUser(user);\n        setErrorMessage(null);\n    };\n    const handleConfirm = async ()=>{\n        try {\n            setLoading(true);\n            if (!selectedUser) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Seleccione un afiliado antes de confirmar\");\n                return;\n            }\n            const response = await fetch(\"/api/handlerafiliado\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    dni: selectedUser.dni\n                })\n            });\n            const responseData = await response.json();\n            console.log(responseData);\n            if (responseData.status === 200) {\n                // window.location.href = '/page/dashboard/afiliado';\n                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.success(responseData.message);\n            } else {\n                responseData.status === 400;\n                setErrorMessage(responseData.status);\n                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(responseData.message);\n            }\n        } catch (error) {\n            console.error(\"Error al confirmar el afiliado:\", error);\n            react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Ocurri\\xf3 un error al confirmar el afiliado\");\n        } finally{\n            setLoading(false);\n        }\n    };\n    const handlePrev = ()=>{\n        setErrorMessage(null); // Limpiar el mensaje de error\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"h6\",\n                children: \"Tipo de usuario: Afiliado\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 111,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: \"Ingrese N\\xba de DNI:\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 112,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                type: \"text\",\n                value: dni,\n                onChange: handleInputChange,\n                className: \"mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, undefined),\n            selectedUser && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        children: [\n                            \"Nombre: \",\n                            selectedUser.name\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 122,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        children: [\n                            \"Dependencia: \",\n                            selectedUser.dependencia\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 123,\n                        columnNumber: 11\n                    }, undefined),\n                    errorMessage === 400 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        variant: \"contained\",\n                        onClick: handlePrev,\n                        className: \"mt-2\",\n                        children: \"Prev\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 125,\n                        columnNumber: 3\n                    }, undefined),\n                    !errorMessage && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        variant: \"contained\",\n                        onClick: handleConfirm,\n                        className: \"mt-2\",\n                        disabled: loading,\n                        children: \"Confirmar\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 121,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 149,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n        lineNumber: 110,\n        columnNumber: 5\n    }, undefined);\n};\n_s(TypeAfiliado, \"lPf0XhX86jruGdZ8ZUlUWeGRm5Q=\");\n_c = TypeAfiliado;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TypeAfiliado); // import React, { useState } from 'react';\n // import { Typography, Input, Button } from '@mui/material';\n // import { ToastContainer, toast } from 'react-toastify';\n // import afiliadosData from '../../../afiliados.json';\n // const TypeAfiliado = () => {\n //   const [dni, setDni] = useState('');\n //   const [selectedAfiliado, setSelectedAfiliado] = useState(null);\n //   const [loading, setLoading] = useState(false); // Agregado para controlar la carga\n //   const handleInputChange = (event) => {\n //     setDni(event.target.value);\n //     setSelectedAfiliado(null); // Limpiar afiliado seleccionado cuando se cambia el input\n //   };\n //   let user = afiliadosData.find(afiliado => afiliado.dni === dni);\n //   setSelectedAfiliado(user)\n //   const handleConfirm = async () => {\n //     try {\n //       setLoading(true); // Establecer carga a true al iniciar la confirmación\n //       if (!selectedAfiliado) {\n //         toast.error('Seleccione un afiliado antes de confirmar');\n //         return;\n //       }\n //       // Simulando la petición POST al backend\n //       const response = await fetch('/api/handlerafiliado', {\n //         method: 'POST',\n //         headers: {\n //           'Content-Type': 'application/json',\n //         },\n //         body: JSON.stringify({ dni: selectedAfiliado.dni }),\n //       });\n //         console.log(\"esto se manda al bakend\",dni)\n //       if (response.ok) {\n //         // Si la solicitud fue exitosa, mostrar un mensaje de éxito\n //         toast.success('Afiliado confirmado correctamente');\n //         // Redireccionar al usuario al dashboard de afiliado\n //         // window.location.href = '/page/dashboard/afiliado';\n //       } else {\n //         if (response.status === 400) {\n //           // Si la respuesta es un error 400, mostrar un mensaje de error y bloquear el botón\n //           toast.error('Error: El afiliado ya está confirmado');\n //           setLoading(true);\n //         } else {\n //           // Si hubo otro tipo de error en la respuesta, mostrar un mensaje de error general\n //           toast.error('Ocurrió un error al confirmar el afiliado');\n //         }\n //       }\n //     } catch (error) {\n //       console.error('Error al confirmar el afiliado:', error);\n //       toast.error('Ocurrió un error al confirmar el afiliado');\n //     } finally {\n //       setLoading(false); // Establecer carga a false después de la confirmación\n //     }\n //   };\n //   // Mapeo de los afiliados fuera del render\n //   const filteredAfiliados = afiliadosData.filter(afiliado => afiliado.dni.includes(dni));\n //   return (\n //     <div className=\"w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md\">\n //       <Typography variant=\"h6\">Ingrese Nº de DNI:</Typography>\n //       <Input\n //         type=\"text\"\n //         value={dni}\n //         onChange={handleInputChange}\n //         className=\"mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900\"\n //       />\n //       {filteredAfiliados.map((afiliado) => (\n //         <div key={afiliado.id} className=\"mt-4\">\n //           <Typography className=\"text-lg item font-normal text-center\">\n //             Nombre: {selectedUser.name}\n //           </Typography>\n //           <Typography className=\"text-lg item font-normal text-center\">\n //             Dependencia: {selectedUser.dependencia}\n //           </Typography>\n //           <Button\n //             variant=\"contained\"\n //             onClick={handleConfirm}\n //             className=\"mt-2\"\n //             disabled={loading} // Deshabilitar el botón si está cargando\n //           >\n //             Confirmar\n //           </Button>\n //         </div>\n //       ))}\n //       <ToastContainer />\n //     </div>\n //   );\n // };\n // export default TypeAfiliado;\nvar _c;\n$RefreshReg$(_c, \"TypeAfiliado\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvQ29tcG9uZW50L3R5cGVTZWxlY3QvdHlwZUFmaWxpYWRvLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNtRDtBQUNPO0FBQ0g7QUFDSDtBQUVwRCxNQUFNUyxlQUFlOztJQUNuQixNQUFNLENBQUNDLGVBQWVDLGlCQUFpQixHQUFHViwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNLENBQUNXLEtBQUtDLE9BQU8sR0FBR1osK0NBQVFBLENBQUM7SUFDL0IsTUFBTSxDQUFDYSxjQUFjQyxnQkFBZ0IsR0FBR2QsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDZSxTQUFTQyxXQUFXLEdBQUdoQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNpQixjQUFjQyxnQkFBZ0IsR0FBR2xCLCtDQUFRQSxDQUFDLE9BQU8saURBQWlEO0lBRXpHQyxnREFBU0EsQ0FBQztRQUNSLCtEQUErRDtRQUMvRCxNQUFNa0IsYUFBYTtZQUNqQixJQUFJO2dCQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTTtnQkFDN0IsTUFBTUMsT0FBTyxNQUFNRixTQUFTRyxJQUFJO2dCQUNoQyxJQUFJSCxTQUFTSSxFQUFFLElBQUlGLEtBQUtHLE1BQU0sS0FBSyxLQUFLO29CQUN0Q2YsaUJBQWlCO29CQUNqQk0sV0FBVztnQkFDYixPQUFPO29CQUNMQSxXQUFXO2dCQUNiO1lBQ0YsRUFBRSxPQUFPVSxPQUFPO2dCQUNkQyxRQUFRRCxLQUFLLENBQUMsa0NBQWtDQTtnQkFDaERWLFdBQVc7WUFDYjtRQUNGO1FBRUFHO0lBQ0YsR0FBRyxFQUFFO0lBRUxsQixnREFBU0EsQ0FBQztRQUNSLDRFQUE0RTtRQUM1RSxNQUFNMkIsMEJBQTBCO1lBQzlCLElBQUluQixlQUFlO2dCQUNqQixJQUFJO29CQUNGLE1BQU1XLFdBQVcsTUFBTUMsTUFBTTtvQkFDN0IsTUFBTUMsT0FBTyxNQUFNRixTQUFTRyxJQUFJO29CQUNoQyxJQUFJSCxTQUFTSSxFQUFFLElB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Q0FDdEQsMEJBQTBCO0NBQzFCLG9CQUFvQjtDQUNwQixrQ0FBa0M7Q0FDbEMsc0NBQXNDO0NBQ3RDLCtCQUErQjtDQUMvQiwyRUFBMkU7Q0FDM0UsY0FBYztDQUNkLHdCQUF3QjtDQUN4QixzQkFBc0I7Q0FDdEIsaUJBQWlCO0NBQ2pCLFlBQVk7Q0FDWiwyQkFBMkI7Q0FDM0IsYUFBYTtDQUNiLE9BQU87Q0FDUCxLQUFLO0NBRUwsK0JBQStCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvQ29tcG9uZW50L3R5cGVTZWxlY3QvdHlwZUFmaWxpYWRvLnRzeD81OTMzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBUeXBvZ3JhcGh5LCBJbnB1dCwgQnV0dG9uIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFRvYXN0Q29udGFpbmVyLCB0b2FzdCB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcclxuaW1wb3J0IGFmaWxpYWRvc0RhdGEgZnJvbSAnLi4vLi4vLi4vYWZpbGlhZG9zLmpzb24nO1xyXG5cclxuY29uc3QgVHlwZUFmaWxpYWRvID0gKCkgPT4ge1xyXG4gIGNvbnN0IFthdXRoZW50aWNhdGVkLCBzZXRBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZG5pLCBzZXREbmldID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFVzZXIsIHNldFNlbGVjdGVkVXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKG51bGwpOyAvLyBJbmljaWFsaXphciBlcnJvck1lc3NhZ2UgY29tbyB1bmEgY2FkZW5hIHZhY8OtYVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gUmVhbGl6YXIgbGEgdmVyaWZpY2FjacOzbiBkZWwgdXN1YXJpbyBhbCBjYXJnYXIgZWwgY29tcG9uZW50ZVxyXG4gICAgY29uc3QgdmVyaWZ5VXNlciA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2hhbmRsZXJhZmlsaWFkbycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rICYmIGRhdGEuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHNldEF1dGhlbnRpY2F0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIHZlcmlmaWNhciBlbCB1c3VhcmlvOicsIGVycm9yKTtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2ZXJpZnlVc2VyKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gVmVyaWZpY2FyIHNpIGVsIHVzdWFyaW8gZXN0w6EgYXV0ZW50aWNhZG8geSBzdSBJRCBlc3TDoSBlbiBsYSBiYXNlIGRlIGRhdG9zXHJcbiAgICBjb25zdCBjaGVja1VzZXJBdXRoZW50aWNhdGlvbiA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKGF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9oYW5kbGVyYWZpbGlhZG8nKTtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2Uub2sgJiYgZGF0YS5zdGF0dXMgPT09IDIwMCAmJiBkYXRhLmlzQXV0aGVudGljYXRlZEFuZEluRGF0YWJhc2UpIHtcclxuICAgICAgICAgICAgLy8gRWwgdXN1YXJpbyBlc3TDoSBhdXRlbnRpY2FkbyB5IHN1IElEIGVzdMOhIGVuIGxhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgICAgICAgLy8gUmVkaXJpZ2lyIGFsIGRhc2hib2FyZCBkZSBhZmlsaWFkb1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcGFnZS9kYXNoYm9hcmQvYWZpbGlhZG8nO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gRWwgdXN1YXJpbyBubyBlc3TDoSBhdXRlbnRpY2FkbyBvIHN1IElEIG5vIGVzdMOhIGVuIGxhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgICAgICAgLy8gUmVkaXJpZ2lyIGFsIGluaWNpbyBkZSBzZXNpw7NuXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9zaWduaW4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCB2ZXJpZmljYXIgbGEgYXV0ZW50aWNhY2nDs24gZGVsIHVzdWFyaW86JywgZXJyb3IpO1xyXG4gICAgICAgICAgdG9hc3QuZXJyb3IoJ09jdXJyacOzIHVuIGVycm9yIGFsIHZlcmlmaWNhciBsYSBhdXRlbnRpY2FjacOzbiBkZWwgdXN1YXJpbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjaGVja1VzZXJBdXRoZW50aWNhdGlvbigpO1xyXG4gIH0sIFthdXRoZW50aWNhdGVkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgY29uc3Qgc2FuaXRpemVkVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKS5zbGljZSgwLCA4KTtcclxuICAgIHNldERuaShzYW5pdGl6ZWRWYWx1ZSk7XHJcbiAgICBjb25zdCB1c2VyID0gYWZpbGlhZG9zRGF0YS5maW5kKGFmaWxpYWRvID0+IGFmaWxpYWRvLmRuaSA9PT0gc2FuaXRpemVkVmFsdWUpO1xyXG4gICAgc2V0U2VsZWN0ZWRVc2VyKHVzZXIpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKG51bGwpXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uZmlybSA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoIXNlbGVjdGVkVXNlcikge1xyXG4gICAgICAgIHRvYXN0LmVycm9yKCdTZWxlY2Npb25lIHVuIGFmaWxpYWRvIGFudGVzIGRlIGNvbmZpcm1hcicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9oYW5kbGVyYWZpbGlhZG8nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZG5pOiBzZWxlY3RlZFVzZXIuZG5pIH0pLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VEYXRhKVxyXG5cclxuICAgICAgIGlmICggcmVzcG9uc2VEYXRhLnN0YXR1cyA9PT0gMjAwKXtcclxuICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcGFnZS9kYXNoYm9hcmQvYWZpbGlhZG8nO1xyXG4gICAgICAgdG9hc3Quc3VjY2VzcyhyZXNwb25zZURhdGEubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgICAgIGVsc2V7IChyZXNwb25zZURhdGEuc3RhdHVzID09PSA0MDApXHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlRGF0YS5zdGF0dXMpOyBcclxuICAgICAgICB0b2FzdC5lcnJvcihyZXNwb25zZURhdGEubWVzc2FnZSk7XHJcbiAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbmZpcm1hciBlbCBhZmlsaWFkbzonLCBlcnJvcik7XHJcbiAgICAgIHRvYXN0LmVycm9yKCdPY3VycmnDsyB1biBlcnJvciBhbCBjb25maXJtYXIgZWwgYWZpbGlhZG8nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXYgPSAoKSA9PiB7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UobnVsbCk7IC8vIExpbXBpYXIgZWwgbWVuc2FqZSBkZSBlcnJvclxyXG4gIH07XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy04MCBtYXgtdy1zY3JlZW4tbGcgbXgtYXV0byBwLTggYmctd2hpdGUgcm91bmRlZC1sZyBzaGFkb3ctbWRcIj5cclxuICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCI+VGlwbyBkZSB1c3VhcmlvOiBBZmlsaWFkbzwvVHlwb2dyYXBoeT5cclxuICAgICAgPGxhYmVsPkluZ3Jlc2UgTsK6IGRlIEROSTo8L2xhYmVsPlxyXG4gICAgICA8SW5wdXRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgdmFsdWU9e2RuaX1cclxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBib3JkZXItdCBib3JkZXItYmx1ZS1ncmF5LTIwMCBmb2N1czpib3JkZXItdCBmb2N1czpib3JkZXItZ3JheS05MDBcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3NlbGVjdGVkVXNlciAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00XCI+XHJcbiAgICAgICAgICA8VHlwb2dyYXBoeT5Ob21icmU6IHtzZWxlY3RlZFVzZXIubmFtZX08L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICA8VHlwb2dyYXBoeT5EZXBlbmRlbmNpYToge3NlbGVjdGVkVXNlci5kZXBlbmRlbmNpYX08L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICB7ZXJyb3JNZXNzYWdlID09PSA0MDAgJiYgKFxyXG4gIDxCdXR0b25cclxuICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxyXG4gICAgb25DbGljaz17aGFuZGxlUHJldn1cclxuICAgIGNsYXNzTmFtZT1cIm10LTJcIlxyXG4gID5cclxuICAgIFByZXZcclxuICA8L0J1dHRvbj5cclxuKX1cclxuXHJcblxyXG4gICAgICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgKFxyXG4gICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29uZmlybX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0yXCJcclxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ30gLy8gRGVzaGFiaWxpdGFyIGVsIGJvdMOzbiBzaSBlc3TDoSBlbiBwcm9jZXNvIGRlIGNhcmdhXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBDb25maXJtYXJcclxuICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPFRvYXN0Q29udGFpbmVyIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHlwZUFmaWxpYWRvO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIGltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuLy8gaW1wb3J0IHsgVHlwb2dyYXBoeSwgSW5wdXQsIEJ1dHRvbiB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBUb2FzdENvbnRhaW5lciwgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XHJcbi8vIGltcG9ydCBhZmlsaWFkb3NEYXRhIGZyb20gJy4uLy4uLy4uL2FmaWxpYWRvcy5qc29uJztcclxuXHJcbi8vIGNvbnN0IFR5cGVBZmlsaWFkbyA9ICgpID0+IHtcclxuLy8gICBjb25zdCBbZG5pLCBzZXREbmldID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFtzZWxlY3RlZEFmaWxpYWRvLCBzZXRTZWxlY3RlZEFmaWxpYWRvXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4vLyAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTsgLy8gQWdyZWdhZG8gcGFyYSBjb250cm9sYXIgbGEgY2FyZ2FcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuLy8gICAgIHNldERuaShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgICAgc2V0U2VsZWN0ZWRBZmlsaWFkbyhudWxsKTsgLy8gTGltcGlhciBhZmlsaWFkbyBzZWxlY2Npb25hZG8gY3VhbmRvIHNlIGNhbWJpYSBlbCBpbnB1dFxyXG4vLyAgIH07XHJcbi8vICAgbGV0IHVzZXIgPSBhZmlsaWFkb3NEYXRhLmZpbmQoYWZpbGlhZG8gPT4gYWZpbGlhZG8uZG5pID09PSBkbmkpO1xyXG4vLyAgIHNldFNlbGVjdGVkQWZpbGlhZG8odXNlcilcclxuLy8gICBjb25zdCBoYW5kbGVDb25maXJtID0gYXN5bmMgKCkgPT4ge1xyXG4vLyAgICAgdHJ5IHtcclxuLy8gICAgICAgc2V0TG9hZGluZyh0cnVlKTsgLy8gRXN0YWJsZWNlciBjYXJnYSBhIHRydWUgYWwgaW5pY2lhciBsYSBjb25maXJtYWNpw7NuXHJcblxyXG4vLyAgICAgICBpZiAoIXNlbGVjdGVkQWZpbGlhZG8pIHtcclxuLy8gICAgICAgICB0b2FzdC5lcnJvcignU2VsZWNjaW9uZSB1biBhZmlsaWFkbyBhbnRlcyBkZSBjb25maXJtYXInKTtcclxuLy8gICAgICAgICByZXR1cm47XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIC8vIFNpbXVsYW5kbyBsYSBwZXRpY2nDs24gUE9TVCBhbCBiYWNrZW5kXHJcbi8vICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvaGFuZGxlcmFmaWxpYWRvJywge1xyXG4vLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGRuaTogc2VsZWN0ZWRBZmlsaWFkby5kbmkgfSksXHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiZXN0byBzZSBtYW5kYSBhbCBiYWtlbmRcIixkbmkpXHJcbi8vICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4vLyAgICAgICAgIC8vIFNpIGxhIHNvbGljaXR1ZCBmdWUgZXhpdG9zYSwgbW9zdHJhciB1biBtZW5zYWplIGRlIMOpeGl0b1xyXG4vLyAgICAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0FmaWxpYWRvIGNvbmZpcm1hZG8gY29ycmVjdGFtZW50ZScpO1xyXG4vLyAgICAgICAgIC8vIFJlZGlyZWNjaW9uYXIgYWwgdXN1YXJpbyBhbCBkYXNoYm9hcmQgZGUgYWZpbGlhZG9cclxuLy8gICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcGFnZS9kYXNoYm9hcmQvYWZpbGlhZG8nO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4vLyAgICAgICAgICAgLy8gU2kgbGEgcmVzcHVlc3RhIGVzIHVuIGVycm9yIDQwMCwgbW9zdHJhciB1biBtZW5zYWplIGRlIGVycm9yIHkgYmxvcXVlYXIgZWwgYm90w7NuXHJcbi8vICAgICAgICAgICB0b2FzdC5lcnJvcignRXJyb3I6IEVsIGFmaWxpYWRvIHlhIGVzdMOhIGNvbmZpcm1hZG8nKTtcclxuLy8gICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgIC8vIFNpIGh1Ym8gb3RybyB0aXBvIGRlIGVycm9yIGVuIGxhIHJlc3B1ZXN0YSwgbW9zdHJhciB1biBtZW5zYWplIGRlIGVycm9yIGdlbmVyYWxcclxuLy8gICAgICAgICAgIHRvYXN0LmVycm9yKCdPY3VycmnDsyB1biBlcnJvciBhbCBjb25maXJtYXIgZWwgYWZpbGlhZG8nKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbmZpcm1hciBlbCBhZmlsaWFkbzonLCBlcnJvcik7XHJcbi8vICAgICAgIHRvYXN0LmVycm9yKCdPY3VycmnDsyB1biBlcnJvciBhbCBjb25maXJtYXIgZWwgYWZpbGlhZG8nKTtcclxuLy8gICAgIH0gZmluYWxseSB7XHJcbi8vICAgICAgIHNldExvYWRpbmcoZmFsc2UpOyAvLyBFc3RhYmxlY2VyIGNhcmdhIGEgZmFsc2UgZGVzcHXDqXMgZGUgbGEgY29uZmlybWFjacOzblxyXG4vLyAgICAgfVxyXG4vLyAgIH07XHJcblxyXG4vLyAgIC8vIE1hcGVvIGRlIGxvcyBhZmlsaWFkb3MgZnVlcmEgZGVsIHJlbmRlclxyXG4vLyAgIGNvbnN0IGZpbHRlcmVkQWZpbGlhZG9zID0gYWZpbGlhZG9zRGF0YS5maWx0ZXIoYWZpbGlhZG8gPT4gYWZpbGlhZG8uZG5pLmluY2x1ZGVzKGRuaSkpO1xyXG5cclxuLy8gICByZXR1cm4gKFxyXG4vLyAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTgwIG1heC13LXNjcmVlbi1sZyBteC1hdXRvIHAtOCBiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1tZFwiPlxyXG4vLyAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIj5JbmdyZXNlIE7CuiBkZSBETkk6PC9UeXBvZ3JhcGh5PlxyXG4vLyAgICAgICA8SW5wdXRcclxuLy8gICAgICAgICB0eXBlPVwidGV4dFwiXHJcbi8vICAgICAgICAgdmFsdWU9e2RuaX1cclxuLy8gICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcbi8vICAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBib3JkZXItdCBib3JkZXItYmx1ZS1ncmF5LTIwMCBmb2N1czpib3JkZXItdCBmb2N1czpib3JkZXItZ3JheS05MDBcIlxyXG4vLyAgICAgICAvPlxyXG4vLyAgICAgICB7ZmlsdGVyZWRBZmlsaWFkb3MubWFwKChhZmlsaWFkbykgPT4gKFxyXG4vLyAgICAgICAgIDxkaXYga2V5PXthZmlsaWFkby5pZH0gY2xhc3NOYW1lPVwibXQtNFwiPlxyXG4vLyAgICAgICAgICAgPFR5cG9ncmFwaHkgY2xhc3NOYW1lPVwidGV4dC1sZyBpdGVtIGZvbnQtbm9ybWFsIHRleHQtY2VudGVyXCI+XHJcbi8vICAgICAgICAgICAgIE5vbWJyZToge3NlbGVjdGVkVXNlci5uYW1lfVxyXG4vLyAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4vLyAgICAgICAgICAgPFR5cG9ncmFwaHkgY2xhc3NOYW1lPVwidGV4dC1sZyBpdGVtIGZvbnQtbm9ybWFsIHRleHQtY2VudGVyXCI+XHJcbi8vICAgICAgICAgICAgIERlcGVuZGVuY2lhOiB7c2VsZWN0ZWRVc2VyLmRlcGVuZGVuY2lhfVxyXG4vLyAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4vLyAgICAgICAgICAgPEJ1dHRvblxyXG4vLyAgICAgICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcclxuLy8gICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29uZmlybX1cclxuLy8gICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMlwiXHJcbi8vICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfSAvLyBEZXNoYWJpbGl0YXIgZWwgYm90w7NuIHNpIGVzdMOhIGNhcmdhbmRvXHJcbi8vICAgICAgICAgICA+XHJcbi8vICAgICAgICAgICAgIENvbmZpcm1hclxyXG4vLyAgICAgICAgICAgPC9CdXR0b24+XHJcbi8vICAgICAgICAgPC9kaXY+XHJcbi8vICAgICAgICkpfVxyXG4vLyAgICAgICA8VG9hc3RDb250YWluZXIgLz5cclxuLy8gICAgIDwvZGl2PlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBUeXBlQWZpbGlhZG87XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiVHlwb2dyYXBoeSIsIklucHV0IiwiQnV0dG9uIiwiVG9hc3RDb250YWluZXIiLCJ0b2FzdCIsImFmaWxpYWRvc0RhdGEiLCJUeXBlQWZpbGlhZG8iLCJhdXRoZW50aWNhdGVkIiwic2V0QXV0aGVudGljYXRlZCIsImRuaSIsInNldERuaSIsInNlbGVjdGVkVXNlciIsInNldFNlbGVjdGVkVXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3JNZXNzYWdlIiwic2V0RXJyb3JNZXNzYWdlIiwidmVyaWZ5VXNlciIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsIm9rIiwic3RhdHVzIiwiZXJyb3IiLCJjb25zb2xlIiwiY2hlY2tVc2VyQXV0aGVudGljYXRpb24iLCJpc0F1dGhlbnRpY2F0ZWRBbmRJbkRhdGFiYXNlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJldmVudCIsInNhbml0aXplZFZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJyZXBsYWNlIiwic2xpY2UiLCJ1c2VyIiwiZmluZCIsImFmaWxpYWRvIiwiaGFuZGxlQ29uZmlybSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlRGF0YSIsImxvZyIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiaGFuZGxlUHJldiIsImRpdiIsImNsYXNzTmFtZSIsInZhcmlhbnQiLCJsYWJlbCIsInR5cGUiLCJvbkNoYW5nZSIsIm5hbWUiLCJkZXBlbmRlbmNpYSIsIm9uQ2xpY2siLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/Component/typeSelect/typeAfiliado.tsx\n"));

/***/ })

});