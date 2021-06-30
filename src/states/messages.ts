import { login, detectLang } from "../services/messages";

interface Args {
  reply: string;
  prevIndex: number;
  [otherArgs: string]: string | number;
}

interface returnType {
  i: number;
  reply: string;
}

export const predefinedMessages: ((n?: string) => string)[] = [
  (name) => `Welcome to LEBOT ${name}`,
  () => "Welcome to LeBOT. Please enter your mobile number",
  () => "What would your good name be?",
  (name) =>
    `Are you sure your name is ${name} ? Press 1 to confirm and Press 0 to re-enter`,
  () => "Re-enter your name",
  () => 'How can we help you today? Type "Logout" to logout anytime',
  (language) => `Would you like to talk in ${language}?`,
  () => "Sure!",
];

const pr = (n: number, reply = "") =>
  Promise.resolve({ i: n, reply: predefinedMessages[n](reply) });

export function getNextMessage({
  reply,
  prevIndex,
  name,
  mobileNumber,
}: Args): Promise<returnType> {
  switch (prevIndex) {
    case 0:
      return pr(5);
    case 1:
      return pr(2);
    case 2: {
      return pr(3, reply);
    }
    case 3: {
      if (reply == "1") {
        // TODO: register the user, update the name
        return login({
          language: 'English',
          name: name as string,
          mobileNumber: mobileNumber as string,
        }).then((res) => {
          if (res) {
            const reply = predefinedMessages[5](name as string);
            return { i: 5, reply };
          } else {
            return { i: 1, reply: predefinedMessages[1]('') }
          }
        })
      } else if (reply == "0") return pr(4);
      return pr(3);
    }
    case 4: {
      return pr(3, reply);
    }
    case 5: {
      // identify the language here
      return detectLang(reply).then((res) => {
        if (res == null) {
          throw new Error('..')
        } else {
          const r = predefinedMessages[6](res![0].language);
          return ({ i: 6, reply: r });
        }
      }).catch(() => {
        return ({ i: 5, reply })
      });
    }
    case 6:
      return pr(7);
    default:
      return pr(prevIndex);
  }
}
