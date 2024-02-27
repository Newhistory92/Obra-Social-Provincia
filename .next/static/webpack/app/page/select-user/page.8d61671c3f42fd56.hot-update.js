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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Input/Input.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Input,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"(app-pages-browser)/./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var _afiliados_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../afiliados.json */ \"(app-pages-browser)/./src/afiliados.json\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst TypeAfiliado = ()=>{\n    _s();\n    const [dni, setDni] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [selectedUser, setSelectedUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Inicializar errorMessage como una cadena vacía\n    const handleInputChange = (event)=>{\n        const sanitizedValue = event.target.value.replace(/\\D/g, \"\").slice(0, 8);\n        setDni(sanitizedValue);\n        const user = _afiliados_json__WEBPACK_IMPORTED_MODULE_3__.find((afiliado)=>afiliado.dni === sanitizedValue);\n        setSelectedUser(user);\n    };\n    const handleConfirm = async ()=>{\n        try {\n            setLoading(true);\n            if (!selectedUser) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Seleccione un afiliado antes de confirmar\");\n                return;\n            }\n            const response = await fetch(\"/api/handlerafiliado\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    dni: selectedUser.dni\n                })\n            });\n            const responseData = await response.json();\n            console.log(responseData);\n            if (response.ok) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.success(\"Afiliado confirmado correctamente\");\n            // Redireccionar al usuario al dashboard de afiliado\n            // window.location.href = '/page/dashboard/afiliado';\n            } else {\n                if (responseData.status === 400) {\n                    setErrorMessage(responseData.status); // Establecer el mensaje de error\n                } else {\n                    react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(responseData.message);\n                }\n            }\n            console.log(responseData.message, \"fds\", setErrorMessage);\n        } catch (error) {\n            console.error(\"Error al confirmar el afiliado:\", error);\n            react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Ocurri\\xf3 un error al confirmar el afiliado\");\n        } finally{\n            setLoading(false);\n        }\n    };\n    const handlePrev = ()=>{\n        setErrorMessage(null); // Limpiar el mensaje de error\n    };\n    console.log(errorMessage);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"h6\",\n                children: \"Tipo de usuario: Afiliado\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: \"Ingrese N\\xba de DNI:\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 67,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                type: \"text\",\n                value: dni,\n                onChange: handleInputChange,\n                className: \"mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, undefined),\n            selectedUser && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        children: [\n                            \"Nombre: \",\n                            selectedUser.name\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        children: [\n                            \"Dependencia: \",\n                            selectedUser.dependencia\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 11\n                    }, undefined),\n                    errorMessage && errorMessage.includes(\"400\") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        variant: \"contained\",\n                        onClick: handlePrev,\n                        className: \"mt-2\",\n                        children: \"Prev\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 11\n                    }, undefined),\n                    !errorMessage && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        variant: \"contained\",\n                        onClick: handleConfirm,\n                        className: \"mt-2\",\n                        disabled: loading,\n                        children: \"Confirmar\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 89,\n                        columnNumber: 13\n                    }, undefined),\n                    errorMessage && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Input_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        className: \"text-red-500\",\n                        children: errorMessage\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                        lineNumber: 98,\n                        columnNumber: 28\n                    }, undefined),\n                    \" \"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 76,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n                lineNumber: 102,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Emiliano\\\\Documents\\\\Obra-Social-Provincia\\\\src\\\\app\\\\Component\\\\typeSelect\\\\typeAfiliado.tsx\",\n        lineNumber: 65,\n        columnNumber: 5\n    }, undefined);\n};\n_s(TypeAfiliado, \"Dg5jRDZVX13WQlgH7vHkBQTH6S0=\");\n_c = TypeAfiliado;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TypeAfiliado); // import React, { useState } from 'react';\n // import { Typography, Input, Button } from '@mui/material';\n // import { ToastContainer, toast } from 'react-toastify';\n // import afiliadosData from '../../../afiliados.json';\n // const TypeAfiliado = () => {\n //   const [dni, setDni] = useState('');\n //   const [selectedAfiliado, setSelectedAfiliado] = useState(null);\n //   const [loading, setLoading] = useState(false); // Agregado para controlar la carga\n //   const handleInputChange = (event) => {\n //     setDni(event.target.value);\n //     setSelectedAfiliado(null); // Limpiar afiliado seleccionado cuando se cambia el input\n //   };\n //   let user = afiliadosData.find(afiliado => afiliado.dni === dni);\n //   setSelectedAfiliado(user)\n //   const handleConfirm = async () => {\n //     try {\n //       setLoading(true); // Establecer carga a true al iniciar la confirmación\n //       if (!selectedAfiliado) {\n //         toast.error('Seleccione un afiliado antes de confirmar');\n //         return;\n //       }\n //       // Simulando la petición POST al backend\n //       const response = await fetch('/api/handlerafiliado', {\n //         method: 'POST',\n //         headers: {\n //           'Content-Type': 'application/json',\n //         },\n //         body: JSON.stringify({ dni: selectedAfiliado.dni }),\n //       });\n //         console.log(\"esto se manda al bakend\",dni)\n //       if (response.ok) {\n //         // Si la solicitud fue exitosa, mostrar un mensaje de éxito\n //         toast.success('Afiliado confirmado correctamente');\n //         // Redireccionar al usuario al dashboard de afiliado\n //         // window.location.href = '/page/dashboard/afiliado';\n //       } else {\n //         if (response.status === 400) {\n //           // Si la respuesta es un error 400, mostrar un mensaje de error y bloquear el botón\n //           toast.error('Error: El afiliado ya está confirmado');\n //           setLoading(true);\n //         } else {\n //           // Si hubo otro tipo de error en la respuesta, mostrar un mensaje de error general\n //           toast.error('Ocurrió un error al confirmar el afiliado');\n //         }\n //       }\n //     } catch (error) {\n //       console.error('Error al confirmar el afiliado:', error);\n //       toast.error('Ocurrió un error al confirmar el afiliado');\n //     } finally {\n //       setLoading(false); // Establecer carga a false después de la confirmación\n //     }\n //   };\n //   // Mapeo de los afiliados fuera del render\n //   const filteredAfiliados = afiliadosData.filter(afiliado => afiliado.dni.includes(dni));\n //   return (\n //     <div className=\"w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md\">\n //       <Typography variant=\"h6\">Ingrese Nº de DNI:</Typography>\n //       <Input\n //         type=\"text\"\n //         value={dni}\n //         onChange={handleInputChange}\n //         className=\"mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900\"\n //       />\n //       {filteredAfiliados.map((afiliado) => (\n //         <div key={afiliado.id} className=\"mt-4\">\n //           <Typography className=\"text-lg item font-normal text-center\">\n //             Nombre: {selectedUser.name}\n //           </Typography>\n //           <Typography className=\"text-lg item font-normal text-center\">\n //             Dependencia: {selectedUser.dependencia}\n //           </Typography>\n //           <Button\n //             variant=\"contained\"\n //             onClick={handleConfirm}\n //             className=\"mt-2\"\n //             disabled={loading} // Deshabilitar el botón si está cargando\n //           >\n //             Confirmar\n //           </Button>\n //         </div>\n //       ))}\n //       <ToastContainer />\n //     </div>\n //   );\n // };\n // export default TypeAfiliado;\nvar _c;\n$RefreshReg$(_c, \"TypeAfiliado\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvQ29tcG9uZW50L3R5cGVTZWxlY3QvdHlwZUFmaWxpYWRvLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUN3QztBQUNrQjtBQUNIO0FBQ0g7QUFFcEQsTUFBTVEsZUFBZTs7SUFDbkIsTUFBTSxDQUFDQyxLQUFLQyxPQUFPLEdBQUdULCtDQUFRQSxDQUFDO0lBQy9CLE1BQU0sQ0FBQ1UsY0FBY0MsZ0JBQWdCLEdBQUdYLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ1ksU0FBU0MsV0FBVyxHQUFHYiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNjLGNBQWNDLGdCQUFnQixHQUFHZiwrQ0FBUUEsQ0FBQyxPQUFPLGlEQUFpRDtJQUd6RyxNQUFNZ0Isb0JBQW9CLENBQUNDO1FBQ3pCLE1BQU1DLGlCQUFpQkQsTUFBTUUsTUFBTSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sQ0FBQyxPQUFPLElBQUlDLEtBQUssQ0FBQyxHQUFHO1FBQ3RFYixPQUFPUztRQUNQLE1BQU1LLE9BQU9qQiw0Q0FBYUEsQ0FBQ2tCLElBQUksQ0FBQ0MsQ0FBQUEsV0FBWUEsU0FBU2pCLEdBQUcsS0FBS1U7UUFDN0RQLGdCQUFnQlk7SUFDbEI7SUFFQSxNQUFNRyxnQkFBZ0I7UUFDcEIsSUFBSTtZQUNGYixXQUFXO1lBRVgsSUFBSSxDQUFDSCxjQUFjO2dCQUNqQkwsaURBQUtBLENBQUNzQixLQUFLLENBQUM7Z0JBQ1o7WUFDRjtZQUVBLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSx3QkFBd0I7Z0JBQ25EQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRTFCLEtBQUtFLGFBQWFGLEdBQUc7Z0JBQUM7WUFDL0M7WUFFQSxNQUFNMkIsZUFBZSxNQUFNUCxTQUFTUSxJQUFJO1lBQ3hDQyxRQUFRQyxHQUFHLENBQUNIO1lBRVosSUFBSVAsU0FBU1csRUFBRSxF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QUFhO0NBQ2IsdUZBQXVGO0NBQ3ZGLGlFQUFpRTtDQUNqRSxlQUFlO0NBQ2Ysc0JBQXNCO0NBQ3RCLHNCQUFzQjtDQUN0Qix1Q0FBdUM7Q0FDdkMsOEZBQThGO0NBQzlGLFdBQVc7Q0FDWCwrQ0FBK0M7Q0FDL0MsbURBQW1EO0NBQ25ELDBFQUEwRTtDQUMxRSwwQ0FBMEM7Q0FDMUMsMEJBQTBCO0NBQzFCLDBFQUEwRTtDQUMxRSxzREFBc0Q7Q0FDdEQsMEJBQTBCO0NBQzFCLG9CQUFvQjtDQUNwQixrQ0FBa0M7Q0FDbEMsc0NBQXNDO0NBQ3RDLCtCQUErQjtDQUMvQiwyRUFBMkU7Q0FDM0UsY0FBYztDQUNkLHdCQUF3QjtDQUN4QixzQkFBc0I7Q0FDdEIsaUJBQWlCO0NBQ2pCLFlBQVk7Q0FDWiwyQkFBMkI7Q0FDM0IsYUFBYTtDQUNiLE9BQU87Q0FDUCxLQUFLO0NBRUwsK0JBQStCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvQ29tcG9uZW50L3R5cGVTZWxlY3QvdHlwZUFmaWxpYWRvLnRzeD81OTMzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVHlwb2dyYXBoeSwgSW5wdXQsIEJ1dHRvbiB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciwgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XHJcbmltcG9ydCBhZmlsaWFkb3NEYXRhIGZyb20gJy4uLy4uLy4uL2FmaWxpYWRvcy5qc29uJztcclxuXHJcbmNvbnN0IFR5cGVBZmlsaWFkbyA9ICgpID0+IHtcclxuICBjb25zdCBbZG5pLCBzZXREbmldID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFVzZXIsIHNldFNlbGVjdGVkVXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKG51bGwpOyAvLyBJbmljaWFsaXphciBlcnJvck1lc3NhZ2UgY29tbyB1bmEgY2FkZW5hIHZhY8OtYVxyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpLnNsaWNlKDAsIDgpO1xyXG4gICAgc2V0RG5pKHNhbml0aXplZFZhbHVlKTtcclxuICAgIGNvbnN0IHVzZXIgPSBhZmlsaWFkb3NEYXRhLmZpbmQoYWZpbGlhZG8gPT4gYWZpbGlhZG8uZG5pID09PSBzYW5pdGl6ZWRWYWx1ZSk7XHJcbiAgICBzZXRTZWxlY3RlZFVzZXIodXNlcik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uZmlybSA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoIXNlbGVjdGVkVXNlcikge1xyXG4gICAgICAgIHRvYXN0LmVycm9yKCdTZWxlY2Npb25lIHVuIGFmaWxpYWRvIGFudGVzIGRlIGNvbmZpcm1hcicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9oYW5kbGVyYWZpbGlhZG8nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZG5pOiBzZWxlY3RlZFVzZXIuZG5pIH0pLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VEYXRhKVxyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdG9hc3Quc3VjY2VzcygnQWZpbGlhZG8gY29uZmlybWFkbyBjb3JyZWN0YW1lbnRlJyk7XHJcbiAgICAgICAgLy8gUmVkaXJlY2Npb25hciBhbCB1c3VhcmlvIGFsIGRhc2hib2FyZCBkZSBhZmlsaWFkb1xyXG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wYWdlL2Rhc2hib2FyZC9hZmlsaWFkbyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlRGF0YS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlRGF0YS5zdGF0dXMpOyAvLyBFc3RhYmxlY2VyIGVsIG1lbnNhamUgZGUgZXJyb3JcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9hc3QuZXJyb3IocmVzcG9uc2VEYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjb25zb2xlLmxvZyhyZXNwb25zZURhdGEubWVzc2FnZSxcImZkc1wiLHNldEVycm9yTWVzc2FnZSlcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbmZpcm1hciBlbCBhZmlsaWFkbzonLCBlcnJvcik7XHJcbiAgICAgIHRvYXN0LmVycm9yKCdPY3VycmnDsyB1biBlcnJvciBhbCBjb25maXJtYXIgZWwgYWZpbGlhZG8nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXYgPSAoKSA9PiB7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UobnVsbCk7IC8vIExpbXBpYXIgZWwgbWVuc2FqZSBkZSBlcnJvclxyXG4gIH07XHJcbiAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKVxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctODAgbWF4LXctc2NyZWVuLWxnIG14LWF1dG8gcC04IGJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LW1kXCI+XHJcbiAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiPlRpcG8gZGUgdXN1YXJpbzogQWZpbGlhZG88L1R5cG9ncmFwaHk+XHJcbiAgICAgIDxsYWJlbD5JbmdyZXNlIE7CuiBkZSBETkk6PC9sYWJlbD5cclxuICAgICAgPElucHV0XHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIHZhbHVlPXtkbml9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm10LTIgYm9yZGVyLXQgYm9yZGVyLWJsdWUtZ3JheS0yMDAgZm9jdXM6Ym9yZGVyLXQgZm9jdXM6Ym9yZGVyLWdyYXktOTAwXCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzZWxlY3RlZFVzZXIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNFwiPlxyXG4gICAgICAgICAgPFR5cG9ncmFwaHk+Tm9tYnJlOiB7c2VsZWN0ZWRVc2VyLm5hbWV9PC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgPFR5cG9ncmFwaHk+RGVwZW5kZW5jaWE6IHtzZWxlY3RlZFVzZXIuZGVwZW5kZW5jaWF9PC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAge2Vycm9yTWVzc2FnZSAmJiBlcnJvck1lc3NhZ2UuaW5jbHVkZXMoXCI0MDBcIikgJiYgKFxyXG4gICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQcmV2fVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibXQtMlwiXHJcbiAgICAgICAgICAgPlxyXG4gICAgICAgICAgIFByZXZcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHshZXJyb3JNZXNzYWdlICYmIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvbmZpcm19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMlwiXHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9IC8vIERlc2hhYmlsaXRhciBlbCBib3TDs24gc2kgZXN0w6EgZW4gcHJvY2VzbyBkZSBjYXJnYVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgQ29uZmlybWFyXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHtlcnJvck1lc3NhZ2UgJiYgPFR5cG9ncmFwaHkgY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+e2Vycm9yTWVzc2FnZX08L1R5cG9ncmFwaHk+fSB7LyogTW9zdHJhciBlbCBtZW5zYWplIGRlIGVycm9yIHNpIGV4aXN0ZSAqL31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxUb2FzdENvbnRhaW5lciAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFR5cGVBZmlsaWFkbztcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbi8vIGltcG9ydCB7IFR5cG9ncmFwaHksIElucHV0LCBCdXR0b24gfSBmcm9tICdAbXVpL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgVG9hc3RDb250YWluZXIsIHRvYXN0IH0gZnJvbSAncmVhY3QtdG9hc3RpZnknO1xyXG4vLyBpbXBvcnQgYWZpbGlhZG9zRGF0YSBmcm9tICcuLi8uLi8uLi9hZmlsaWFkb3MuanNvbic7XHJcblxyXG4vLyBjb25zdCBUeXBlQWZpbGlhZG8gPSAoKSA9PiB7XHJcbi8vICAgY29uc3QgW2RuaSwgc2V0RG5pXSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbc2VsZWN0ZWRBZmlsaWFkbywgc2V0U2VsZWN0ZWRBZmlsaWFkb10gPSB1c2VTdGF0ZShudWxsKTtcclxuLy8gICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7IC8vIEFncmVnYWRvIHBhcmEgY29udHJvbGFyIGxhIGNhcmdhXHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbi8vICAgICBzZXREbmkoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuLy8gICAgIHNldFNlbGVjdGVkQWZpbGlhZG8obnVsbCk7IC8vIExpbXBpYXIgYWZpbGlhZG8gc2VsZWNjaW9uYWRvIGN1YW5kbyBzZSBjYW1iaWEgZWwgaW5wdXRcclxuLy8gICB9O1xyXG4vLyAgIGxldCB1c2VyID0gYWZpbGlhZG9zRGF0YS5maW5kKGFmaWxpYWRvID0+IGFmaWxpYWRvLmRuaSA9PT0gZG5pKTtcclxuLy8gICBzZXRTZWxlY3RlZEFmaWxpYWRvKHVzZXIpXHJcbi8vICAgY29uc3QgaGFuZGxlQ29uZmlybSA9IGFzeW5jICgpID0+IHtcclxuLy8gICAgIHRyeSB7XHJcbi8vICAgICAgIHNldExvYWRpbmcodHJ1ZSk7IC8vIEVzdGFibGVjZXIgY2FyZ2EgYSB0cnVlIGFsIGluaWNpYXIgbGEgY29uZmlybWFjacOzblxyXG5cclxuLy8gICAgICAgaWYgKCFzZWxlY3RlZEFmaWxpYWRvKSB7XHJcbi8vICAgICAgICAgdG9hc3QuZXJyb3IoJ1NlbGVjY2lvbmUgdW4gYWZpbGlhZG8gYW50ZXMgZGUgY29uZmlybWFyJyk7XHJcbi8vICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICAvLyBTaW11bGFuZG8gbGEgcGV0aWNpw7NuIFBPU1QgYWwgYmFja2VuZFxyXG4vLyAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2hhbmRsZXJhZmlsaWFkbycsIHtcclxuLy8gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBkbmk6IHNlbGVjdGVkQWZpbGlhZG8uZG5pIH0pLFxyXG4vLyAgICAgICB9KTtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImVzdG8gc2UgbWFuZGEgYWwgYmFrZW5kXCIsZG5pKVxyXG4vLyAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuLy8gICAgICAgICAvLyBTaSBsYSBzb2xpY2l0dWQgZnVlIGV4aXRvc2EsIG1vc3RyYXIgdW4gbWVuc2FqZSBkZSDDqXhpdG9cclxuLy8gICAgICAgICB0b2FzdC5zdWNjZXNzKCdBZmlsaWFkbyBjb25maXJtYWRvIGNvcnJlY3RhbWVudGUnKTtcclxuLy8gICAgICAgICAvLyBSZWRpcmVjY2lvbmFyIGFsIHVzdWFyaW8gYWwgZGFzaGJvYXJkIGRlIGFmaWxpYWRvXHJcbi8vICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3BhZ2UvZGFzaGJvYXJkL2FmaWxpYWRvJztcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcclxuLy8gICAgICAgICAgIC8vIFNpIGxhIHJlc3B1ZXN0YSBlcyB1biBlcnJvciA0MDAsIG1vc3RyYXIgdW4gbWVuc2FqZSBkZSBlcnJvciB5IGJsb3F1ZWFyIGVsIGJvdMOzblxyXG4vLyAgICAgICAgICAgdG9hc3QuZXJyb3IoJ0Vycm9yOiBFbCBhZmlsaWFkbyB5YSBlc3TDoSBjb25maXJtYWRvJyk7XHJcbi8vICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAvLyBTaSBodWJvIG90cm8gdGlwbyBkZSBlcnJvciBlbiBsYSByZXNwdWVzdGEsIG1vc3RyYXIgdW4gbWVuc2FqZSBkZSBlcnJvciBnZW5lcmFsXHJcbi8vICAgICAgICAgICB0b2FzdC5lcnJvcignT2N1cnJpw7MgdW4gZXJyb3IgYWwgY29uZmlybWFyIGVsIGFmaWxpYWRvJyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcbi8vICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4vLyAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjb25maXJtYXIgZWwgYWZpbGlhZG86JywgZXJyb3IpO1xyXG4vLyAgICAgICB0b2FzdC5lcnJvcignT2N1cnJpw7MgdW4gZXJyb3IgYWwgY29uZmlybWFyIGVsIGFmaWxpYWRvJyk7XHJcbi8vICAgICB9IGZpbmFsbHkge1xyXG4vLyAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTsgLy8gRXN0YWJsZWNlciBjYXJnYSBhIGZhbHNlIGRlc3B1w6lzIGRlIGxhIGNvbmZpcm1hY2nDs25cclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG5cclxuLy8gICAvLyBNYXBlbyBkZSBsb3MgYWZpbGlhZG9zIGZ1ZXJhIGRlbCByZW5kZXJcclxuLy8gICBjb25zdCBmaWx0ZXJlZEFmaWxpYWRvcyA9IGFmaWxpYWRvc0RhdGEuZmlsdGVyKGFmaWxpYWRvID0+IGFmaWxpYWRvLmRuaS5pbmNsdWRlcyhkbmkpKTtcclxuXHJcbi8vICAgcmV0dXJuIChcclxuLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwidy04MCBtYXgtdy1zY3JlZW4tbGcgbXgtYXV0byBwLTggYmctd2hpdGUgcm91bmRlZC1sZyBzaGFkb3ctbWRcIj5cclxuLy8gICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCI+SW5ncmVzZSBOwrogZGUgRE5JOjwvVHlwb2dyYXBoeT5cclxuLy8gICAgICAgPElucHV0XHJcbi8vICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4vLyAgICAgICAgIHZhbHVlPXtkbml9XHJcbi8vICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG4vLyAgICAgICAgIGNsYXNzTmFtZT1cIm10LTIgYm9yZGVyLXQgYm9yZGVyLWJsdWUtZ3JheS0yMDAgZm9jdXM6Ym9yZGVyLXQgZm9jdXM6Ym9yZGVyLWdyYXktOTAwXCJcclxuLy8gICAgICAgLz5cclxuLy8gICAgICAge2ZpbHRlcmVkQWZpbGlhZG9zLm1hcCgoYWZpbGlhZG8pID0+IChcclxuLy8gICAgICAgICA8ZGl2IGtleT17YWZpbGlhZG8uaWR9IGNsYXNzTmFtZT1cIm10LTRcIj5cclxuLy8gICAgICAgICAgIDxUeXBvZ3JhcGh5IGNsYXNzTmFtZT1cInRleHQtbGcgaXRlbSBmb250LW5vcm1hbCB0ZXh0LWNlbnRlclwiPlxyXG4vLyAgICAgICAgICAgICBOb21icmU6IHtzZWxlY3RlZFVzZXIubmFtZX1cclxuLy8gICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuLy8gICAgICAgICAgIDxUeXBvZ3JhcGh5IGNsYXNzTmFtZT1cInRleHQtbGcgaXRlbSBmb250LW5vcm1hbCB0ZXh0LWNlbnRlclwiPlxyXG4vLyAgICAgICAgICAgICBEZXBlbmRlbmNpYToge3NlbGVjdGVkVXNlci5kZXBlbmRlbmNpYX1cclxuLy8gICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuLy8gICAgICAgICAgIDxCdXR0b25cclxuLy8gICAgICAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXHJcbi8vICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvbmZpcm19XHJcbi8vICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTJcIlxyXG4vLyAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ30gLy8gRGVzaGFiaWxpdGFyIGVsIGJvdMOzbiBzaSBlc3TDoSBjYXJnYW5kb1xyXG4vLyAgICAgICAgICAgPlxyXG4vLyAgICAgICAgICAgICBDb25maXJtYXJcclxuLy8gICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICApKX1cclxuLy8gICAgICAgPFRvYXN0Q29udGFpbmVyIC8+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICApO1xyXG4vLyB9O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgVHlwZUFmaWxpYWRvO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlR5cG9ncmFwaHkiLCJJbnB1dCIsIkJ1dHRvbiIsIlRvYXN0Q29udGFpbmVyIiwidG9hc3QiLCJhZmlsaWFkb3NEYXRhIiwiVHlwZUFmaWxpYWRvIiwiZG5pIiwic2V0RG5pIiwic2VsZWN0ZWRVc2VyIiwic2V0U2VsZWN0ZWRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJzZXRFcnJvck1lc3NhZ2UiLCJoYW5kbGVJbnB1dENoYW5nZSIsImV2ZW50Iiwic2FuaXRpemVkVmFsdWUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlcGxhY2UiLCJzbGljZSIsInVzZXIiLCJmaW5kIiwiYWZpbGlhZG8iLCJoYW5kbGVDb25maXJtIiwiZXJyb3IiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2VEYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJvayIsInN1Y2Nlc3MiLCJzdGF0dXMiLCJtZXNzYWdlIiwiaGFuZGxlUHJldiIsImRpdiIsImNsYXNzTmFtZSIsInZhcmlhbnQiLCJsYWJlbCIsInR5cGUiLCJvbkNoYW5nZSIsIm5hbWUiLCJkZXBlbmRlbmNpYSIsImluY2x1ZGVzIiwib25DbGljayIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/Component/typeSelect/typeAfiliado.tsx\n"));

/***/ })

});