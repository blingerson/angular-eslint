import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createESLintRule } from '../utils/create-eslint-rule';
import { MODULE_CLASS_DECORATOR } from '../utils/selectors';
import { getDecoratorPropertyValue, isArrayExpression } from '../utils/utils';

import { NgModule } from '@angular/compiler/src/core';

type Options = [];
export const RULE_NAME = 'no-empty-ngmodule-arrays';
export type MessageIds = 'noEmptyNgmoduleArrays';
const validProperties: (keyof NgModule)[] = [
  'bootstrap',
  'declarations',
  'entryComponents',
  'exports',
  'imports',
  'providers',
  'schemas',
];

export default createESLintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforces the removal of empty metadata arrays from the NgModule decorator',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
    messages: {
      noEmptyNgmoduleArrays:
        'Empty metadata arrays should not be included in the NgModule decorator',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [MODULE_CLASS_DECORATOR](node: TSESTree.Decorator) {
        validProperties.forEach((prop: keyof NgModule) => {
          const initializer = getDecoratorPropertyValue(node, prop);
          if (
            initializer &&
            isArrayExpression(initializer) &&
            initializer.elements.length === 0
          ) {
            context.report({
              messageId: 'noEmptyNgmoduleArrays',
              node: initializer,
            });
          }
        });
      },
    };
  },
});
