export type JsonSchemaProperty = {
    type?: string | string[];
    format?: string;
    enum?: string[];
    const?: string;
    $ref?: string;
    items?: Record<string, JsonSchemaProperty | string>;
}

export type JsonSchema = {
    $id: string;
    $schema: string;
    title: string;
    description?: string;
    type: string;
    properties: Record<string, JsonSchemaProperty>;
    required?: string[];
    oneOf?: Partial<JsonSchema>[];
}

export type JsonSchemaDef = {
    schema_type: string;
    schema_type_version: number;
    schema: JsonSchema;
}

const AutologicalSchemas: Record<string, JsonSchemaDef> = {
    "RULE": {
        "schema_type": "RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "Rule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string"
                }
            }
        }
    },
    "END_RULE": {
        "schema_type": "END_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "END_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "EndRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string",
                    "enum": ["is undefined", "is not undefined", "is null", "is not null", "abs"]
                }
            },
            "required": ["operator"]
        }
    },
    "CAST_RULE": {
        "schema_type": "CAST_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "CAST_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "CastRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "cast"
                },
                "castTo": {
                    "type": "string",
                    "enum": ["string", "boolean", "number", "JSON"]
                }
            },
            "required": ["operator", "castTo"]
        }
    },
    "SET_RULE": {
        "schema_type": "SET_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "SET_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "SetRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "set"
                },
                "setPath": {
                    "type": "string",
                    "format": "JSONPointer"
                }
            },
            "oneOf": [
                { "required": ["operator", "setPath"] },
                {
                    "properties": {
                        "value": {
                            "type": ["string", "number", "boolean", "null"]
                        }
                    },
                    "required": ["operator", "setPath", "value"]
                },
                {
                    "properties": {
                        "getValue": {
                            "type": "array",
                            "items": {
                                "$ref": "#/RULE"
                            }
                        }
                    },
                    "required": ["operator", "setPath", "getValue"]
                }
            ]
        }
    },
    "LENGTH_RULE": {
        "schema_type": "LENGTH_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "LENGTH_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "LengthRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "len"
                }
            },
            "required": ["operator"]
        }
    },
    "LOGICAL_VALUE_RULE": {
        "schema_type": "LOGICAL_VALUE_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "LOGICAL_VALUE_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "LogicalValueRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string",
                    "enum": ["=", ">", "<", ">=", "<=", "not", "!=", "!>", "!<", "!>=", "!<="]
                }
            },
            "oneOf": [
                {
                    "properties": {
                        "value": {
                            "type": ["string", "number", "boolean", "null"]
                        }
                    },
                    "required": ["operator", "value"]
                },
                {
                    "properties": {
                        "getValue": {
                            "type": "array",
                            "items": {
                                "$ref": "#/RULE"
                            }
                        }
                    },
                    "required": ["operator", "getValue"]
                }
            ]
        }
    },
    "CONTAINS_RULE": {
        "schema_type": "CONTAINS_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "CONTAINS_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ContainsRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "contains"
                }
            },
            "oneOf": [
                {
                    "properties": {
                        "value": {
                            "type": ["string", "number", "boolean", "null"]
                        }
                    },
                    "required": ["operator", "value"]
                },
                {
                    "properties": {
                        "getValue": {
                            "type": "array",
                            "items": {
                                "$ref": "#/RULE"
                            }
                        }
                    },
                    "required": ["operator", "getValue"]
                }
            ]
        }
    },
    "ARITHMETIC_VALUE_RULE": {
        "schema_type": "ARITHMETIC_VALUE_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARITHMETIC_VALUE_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArithmeticValueRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string",
                    "enum": ["+", "-", "*", "/", "%", "^"]
                }
            },
            "oneOf": [
                {
                    "properties": {
                        "value": {
                            "type": ["string", "number"]
                        }
                    },
                    "required": ["operator", "value"]
                },
                {
                    "properties": {
                        "getValue": {
                            "type": "array",
                            "items": {
                                "$ref": "#/RULE"
                            }
                        }
                    },
                    "required": ["operator", "getValue"]
                }
            ]
        }
    },
    "ARRAY_ARITHMETIC_INSPECTION_RULE": {
        "schema_type": "ARRAY_ARITHMETIC_INSPECTION_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARRAY_ARITHMETIC_INSPECTION_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArrayArithmeticInspectionRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string",
                    "enum": ["min", "max", "sum", "mean", "median", "mode"]
                }
            },
            "required": ["operator"]
        }
    },
    "LOGICAL_GROUPING_RULE": {
        "schema_type": "LOGICAL_GROUPING_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "LOGICAL_GROUPING_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "LogicalGroupingRule",
            "type": "object",
            "properties": {
                "operator": {
                    "type": "string",
                    "enum": ["and", "or"]
                },
                "rules": {
                    "type": "array",
                    "items": {
                        "$ref": "#/RULE"
                    }
                }
            },
            "required": ["operator", "rules"]
        }
    },
    "PATH_RESOLUTION_RULE": {
        "schema_type": "PATH_RESOLUTION_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "PATH_RESOLUTION_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "PathResolutionRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                }
            },
            "required": ["path"]
        }
    },
    "ARRAY_INSPECTION_RULE": {
        "schema_type": "ARRAY_INSPECTION_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARRAY_INSPECTION_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArrayInspectionRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "type": "string",
                    "enum": ["filter", "map"]
                },
                "rules": {
                    "type": "array",
                    "items": {
                        "$ref": "#/RULE"
                    }
                }
            },
            "required": ["operator", "rules"]
        }
    },
    "ARRAY_SLICE_RULE": {
        "schema_type": "ARRAY_SLICE_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARRAY_SLICE_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArraySliceRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "slice"
                },
                "startIndex": {
                    "type": "number"
                },
                "endIndex": {
                    "type": "number"
                }
            },
            "required": ["operator", "startIndex", "endIndex"]
        }
    },
    "ARRAY_SPLICE_RULE": {
        "schema_type": "ARRAY_SPLICE_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARRAY_SPLICE_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArraySpliceRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "splice"
                }
            },
            "oneOf": [
                { "required": ["operator"] },
                {
                    "properties": {
                        "startIndex": {
                            "type": "number"
                        },
                        "deleteCount": {
                            "type": "number"
                        },
                        "itemsToAdd": {
                            "type": "number"
                        }
                    },
                    "required": ["operator", "startIndex"]
                }
            ]
        }
    },
    "ARRAY_SORT_RULE": {
        "schema_type": "ARRAY_SORT_RULE",
        "schema_type_version": 1,
        "schema": {
            "$id": "ARRAY_SORT_RULE",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ArraySortRule",
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "format": "JSONPointer"
                },
                "operator": {
                    "const": "sort"
                },
                "getComparisonValue": {
                    "type": "array",
                    "items": {
                        "$ref": "#/RULE"
                    }
                },
                "comparisonOperator": {
                    "type": "string",
                    "enum": [">", "<", ">=", "<=", "+", "-", "*", "/", "%", "^"]
                }
            }
        }
    }
};
export { AutologicalSchemas };
