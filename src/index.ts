/**
 * EmojiHub MCP — wraps EmojiHub API (free, no auth)
 *
 * Tools:
 * - random_emoji: Get a random emoji
 * - get_by_category: Get emojis by category (e.g. smileys-and-people)
 * - get_by_group: Get emojis by group (e.g. face-positive)
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://emojihub.yurace.pro/api';

type RawEmoji = {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
};

function formatEmoji(emoji: RawEmoji) {
  return {
    name: emoji.name,
    category: emoji.category,
    group: emoji.group,
    htmlCode: emoji.htmlCode,
    unicode: emoji.unicode,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_emoji',
    description: 'Get a random emoji from the EmojiHub API.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_by_category',
    description:
      'Get all emojis in a given category. Example categories: smileys-and-people, animals-and-nature, food-and-drink, travel-and-places, activities, objects, symbols, flags.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description:
            'The emoji category slug, e.g. "smileys-and-people", "animals-and-nature", "food-and-drink".',
        },
      },
      required: ['category'],
    },
  },
  {
    name: 'get_by_group',
    description:
      'Get all emojis in a given group. Example groups: face-positive, face-negative, face-neutral, hand-fingers-open, animals-mammal.',
    inputSchema: {
      type: 'object',
      properties: {
        group: {
          type: 'string',
          description:
            'The emoji group slug, e.g. "face-positive", "face-negative", "animals-mammal".',
        },
      },
      required: ['group'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_emoji':
      return randomEmoji();
    case 'get_by_category':
      return getByCategory(args.category as string);
    case 'get_by_group':
      return getByGroup(args.group as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomEmoji() {
  const res = await fetch(`${BASE_URL}/random`);
  if (!res.ok) throw new Error(`EmojiHub API error: ${res.status}`);
  const data = (await res.json()) as RawEmoji;
  return formatEmoji(data);
}

async function getByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/all/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`EmojiHub API error: ${res.status}`);
  const data = (await res.json()) as RawEmoji[];
  return {
    category,
    count: data.length,
    emojis: data.map(formatEmoji),
  };
}

async function getByGroup(group: string) {
  const res = await fetch(`${BASE_URL}/all/group/${encodeURIComponent(group)}`);
  if (!res.ok) throw new Error(`EmojiHub API error: ${res.status}`);
  const data = (await res.json()) as RawEmoji[];
  return {
    group,
    count: data.length,
    emojis: data.map(formatEmoji),
  };
}

export default { tools, callTool } satisfies McpToolExport;
