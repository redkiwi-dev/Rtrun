interface WatchOptions {
  /// A directory to listen to the changes in
  directory: string;
  /// A pattern to include when listening
  include?: string;
  /// A pattern to exclude when listening
  exclude?: string;
}

interface TaskOptions {
  /// A task to run, or run multiple tasks sequently
  task: string;
  /// Silence output of the task
  silent?: boolean;
  /// A directory where the task will run
  directory?: string;
  /// A directory to listen to the changes in
  // TODO: add support for: WatchOptions
  watch?: boolean;
  /// Whether or not benchmark the task
  bench?: boolean;
  /// If executing this task throws any errors, our task will fail to run
  // TODO: condition?: null | string | Task;
  /// Allow task included as an condition by other tasks
  // TODO: allowConditions?: boolean;
  /// Interval after which this task will be re-executed
  interval?: null | number;
}

type Task = string | TaskOptions;
