module.exports = {
    "parser": "@babel/eslint-parser",
	"extends": [
		"react-app",
		"react-app/jest"
	],
	"plugins": [],
	"rules": {
		"react/react-in-jsx-scope": "off"
	},
    "settings": {
		"flowtype": {
			"onlyFilesWithFlowAnnotation": false
		}
	},
  };