declare module "awkjs" {
    export function awkjs(overrides?: Object): Promise<{ awk: (text: string, query: string, options: string[]) => { stdout: string, stderr: string } }>;
}