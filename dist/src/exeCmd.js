function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { spawn } from "child_process";
import ora from "ora";
import { checkCommandAvailability } from "./helpers/checkCmdAvi";
import { cmdOutput } from "./helpers/cmdOut";
import { exit } from "process";
import { watch } from "fs";
export function executeCommand(command, arg) {
    return _executeCommand.apply(this, arguments);
}
function _executeCommand() {
    _executeCommand = _async_to_generator(function(command, arg) {
        var start, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    start = ora("Executing (".concat(arg, "): ").concat(command)).start();
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        7,
                        8,
                        9
                    ]);
                    if (!(typeof command === "string")) return [
                        3,
                        3
                    ];
                    return [
                        4,
                        executeStringCommand(command, arg, start)
                    ];
                case 2:
                    _state.sent();
                    return [
                        3,
                        6
                    ];
                case 3:
                    if (!((typeof command === "undefined" ? "undefined" : _type_of(command)) === "object" && command.task)) return [
                        3,
                        5
                    ];
                    return [
                        4,
                        executeObjectCommand(command, start)
                    ];
                case 4:
                    _state.sent();
                    return [
                        3,
                        6
                    ];
                case 5:
                    throw new Error("Invalid command type");
                case 6:
                    return [
                        3,
                        9
                    ];
                case 7:
                    error = _state.sent();
                    start.fail("Error executing command: ".concat(error.message));
                    start.stop();
                    exit(1);
                    return [
                        3,
                        9
                    ];
                case 8:
                    start.stop();
                    return [
                        7
                    ];
                case 9:
                    return [
                        2
                    ];
            }
        });
    });
    return _executeCommand.apply(this, arguments);
}
function executeStringCommand(command, arg, start) {
    return _executeStringCommand.apply(this, arguments);
}
function _executeStringCommand() {
    _executeStringCommand = _async_to_generator(function(command, arg, start) {
        var taskArr, first, cmd_args, esbuildProcess;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    taskArr = command.split(" ");
                    first = taskArr[0];
                    cmd_args = taskArr.slice(1);
                    return [
                        4,
                        checkCommandAvailability(first).catch(function(err) {
                            start.fail("command \x1b[31m".concat(first, "\x1b[0m not found: \n ").concat(err));
                            exit(1);
                        })
                    ];
                case 1:
                    _state.sent();
                    esbuildProcess = spawn(first, cmd_args.filter(function(a) {
                        return a.trim();
                    }));
                    cmdOutput(esbuildProcess, {});
                    return [
                        2
                    ];
            }
        });
    });
    return _executeStringCommand.apply(this, arguments);
}
function executeObjectCommand(options, start) {
    return _executeObjectCommand.apply(this, arguments);
}
function _executeObjectCommand() {
    _executeObjectCommand = _async_to_generator(function(options, start) {
        var task, silent, directory, Watch, bench, interval, esbuildProcess, watchDirectory;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    task = options.task, silent = options.silent, directory = options.directory, Watch = options.watch, bench = options.bench, interval = options.interval;
                    return [
                        4,
                        checkCommandAvailability(task).catch(function(err) {
                            start.fail("command \x1b[31m".concat(task, "\x1b[0m not found: \n ").concat(err));
                            exit(1);
                        })
                    ];
                case 1:
                    _state.sent();
                    esbuildProcess = spawn(task, [], {
                        cwd: directory
                    });
                    if (typeof interval === "number" && interval) {
                        setTimeout(function() {
                            cmdOutput(esbuildProcess, {
                                isSilent: silent,
                                isBench: bench,
                                start: start,
                                startTime: Date.now()
                            });
                        }, interval);
                    } else {
                        cmdOutput(esbuildProcess, {
                            isSilent: silent,
                            isBench: bench,
                            start: start,
                            startTime: Date.now()
                        });
                    }
                    if (Watch) {
                        watchDirectory = directory ? directory : process.cwd();
                        watch(watchDirectory, {
                            recursive: true
                        }, function(eventType, filename) {
                            console.log("".concat(filename, " was ").concat(eventType, "."));
                            esbuildProcess.kill();
                            executeObjectCommand(_object_spread_props(_object_spread({}, options), {
                                task: task
                            }), start);
                        }).on("error", function(err) {
                            console.error("Error watching ".concat(directory, ":"), err);
                        });
                    }
                    return [
                        2
                    ];
            }
        });
    });
    return _executeObjectCommand.apply(this, arguments);
}
