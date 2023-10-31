import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/**/*.graphql',
  generates: {
    './src/types/graphqlTypesGenerated.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: `import type { FileUpload } from 'graphql-upload/Upload';`,
          },
        },
      ],
      config: {
        contextType: './types#CustomContext',
        scalars: {
          Upload: 'Promise<FileUpload>',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;

