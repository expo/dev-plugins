export interface ProjectInfo {
  name: string;
  description: string;
  hookName: string;
}

export interface Transform {
  project: ProjectInfo;

  /** The `expo` package version to install */
  expoPackageVersion: string;
}
