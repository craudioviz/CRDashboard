import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--avatar", required=True)
args = parser.parse_args()

print(f"[PREVIEW] Emotion UX preview launched for avatar '{args.avatar}'")
