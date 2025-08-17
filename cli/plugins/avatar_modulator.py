import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--avatar", required=True)
parser.add_argument("--emotion", required=True)
args = parser.parse_args()

print(f"[MODULATOR] Avatar '{args.avatar}' modulated with emotion '{args.emotion}'")
